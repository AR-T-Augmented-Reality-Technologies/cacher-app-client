import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { Button, View, ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout_user } from "../../features/users.slice";
import { badcheck } from "../../Hooks/filter";
import { FileUploader } from "react-drag-drop-files";

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [currentPage, setCurrentPage] = useState("Profile");
  const [editing, setEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showChangeProfilePicture, setShowChangeProfilePicture] =
    useState(false);
  const [showLabel, setShowLabel] = useState("Public Scrapbooks");
  const [Message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingSuccess, setEditingSuccess] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);

  const minDate = new Date();
  const maxDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);
  maxDate.setFullYear(maxDate.getFullYear() - 13);

  // convert the date to format yyyy-mm-dd
  const minDateStr = minDate.toISOString().split("T")[0];
  const maxDateStr = maxDate.toISOString().split("T")[0];

  // Profile Fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [profileImage, setProfileImage] = useState("");

  // Profile Picture
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);

  // Store current page in local storage
  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(storedPage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // eslint-disable-next-line
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);
  

  const dispatch = useDispatch();

  // Use our user store
  const user = useSelector((state: any) => state.users);

  const getData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_REST_API_HOST}/users/${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        mode: "cors",
      }
    );

    const data = await response.json();

    console.log(data);

    // eslint-disable-next-line
    const formatedDob = data.data.age.dob.split("T")[0];
    setUsername(data.data.user.user_username);
    setFirstname(data.data.user.user_firstname);
    setLastname(data.data.user.user_lastname);
    setEmail(data.data.user.user_email);
    setPassword(data.data.user.user_password);
    setDob(formatedDob);
    setProfileImage(data.data.user.profile_pic)

    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Delete account
  const deleteAccountPopup = () => {
    setShowDeletePopup(!showDeletePopup);
  };

  // Delete account
  const deleteAccount = async () => {
    //TODO delete account
    const response = await fetch(
      `${process.env.REACT_APP_REST_API_HOST}/users/${user.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        mode: "cors",
      }
    );

    // Clear local storage
    localStorage.removeItem("currentPage");

    // Clear session storage
    sessionStorage.clear();

    // Navigate to login page
    navigation.navigate("Login");

    // Show delete account popup
    setShowDeletePopup(!showDeletePopup);
  };

  // Cancel delete account
  const cancelDelete = () => {
    setShowDeletePopup(!showDeletePopup);
  };

  // Change profile picture
  const changeProfilePicture = async () => {
    // if there is no file, return
    if (!profilePictureFile) {
      setShowChangeProfilePicture(!showChangeProfilePicture);
      return;
    }

    console.log(profilePictureFile.text());
    console.log(profilePictureFile.stream());
    // create a new form data
    const formData = new FormData();

    // add the file to the form data
    formData.append("image", profilePictureFile);

    // send the form data to the server
    const imageUploadRespose = await fetch(`${process.env.REACT_APP_REST_API_HOST}/images/uploadProfilePic`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });

    const imageData = await imageUploadRespose.json();
    console.log(await imageData);

    const uploadProfilePictureResponse = await fetch(
      `${process.env.REACT_APP_REST_API_HOST}/users/${user.id}/updateProfilePicture`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        mode: "cors",
        body: JSON.stringify({
          imageURL: await imageData.uploadURL,
        }),
      }
    );

    const uploadProfilePictureData = await uploadProfilePictureResponse.json();

    console.log(await uploadProfilePictureData);
    setProfileImage(await imageData.uploadURL);

    // Finally close the dialog
    setShowChangeProfilePicture(!showChangeProfilePicture);
    console.log("Change profile picture");
  };

  // Cancel change profile picture
  const cancelChangeProfilePicture = () => {
    setShowChangeProfilePicture(!showChangeProfilePicture);
  };

  // eslint-disable-next-line
  // Edit account details
  const editDetails = async () => {
    setEditing(true);

    const updatedData = {
      user_firstname: firstname,
      user_lastname: lastname,
      user_username: username,
      user_email: email,
      user_password: password,
      user_password_confirm: passwordConfirm,
      user_dob: new Date(dob),
    };

    const regex_password =
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    
    if (!regex_password.test(password)) {
        setError("password");
        setMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one number and one special character");
        console.log("Password must be at least 8 characters long and contain at least one uppercase letter, one number and one special character");
        return false;
    }


    const updateResponse = await fetch(
      `${process.env.REACT_APP_REST_API_HOST}/users/${user.id}/updateProfileData`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedData),
      }
    ).then((res) => res);

    const updateData = await updateResponse.json();

    if (updateData && updateData.data && updateData.data.message === "FIRST NAME CANNOT BE EMPTY") {
        setError("firstname");
        setMessage("First name cannot be empty");
        console.log("First name cannot be empty");
        return false;
    }

    if (updateData && updateData.data && updateData.data.message === "LAST NAME CANNOT BE EMPTY") {
        setError("lastname");
        setMessage("Last name cannot be empty");
        console.log("Last name cannot be empty");
        return false;
    }

    if (updateData && updateData.data && updateData.data.message === "USERNAME CANNOT BE EMPTY") {
        setError("username");
        setMessage("Username cannot be empty");
        console.log("Username cannot be empty");
        return false;
    }

    if (updateData && updateData.data && updateData.data.message === "USERNAME ALREADY EXISTS") {
      setError("username");
      setMessage("Username already exists");
      console.log("Username already exists");
      return false;
    }

    if (updateData && updateData.data && updateData.data.message === "INVALID PASSWORD FORMAT") {
        setError("password");
        setMessage("Password must be at least 8 characters long");
    }

    if (updateData && updateData.data && updateData.data.message === "EMAIL ALREADY EXISTS") {
      setError("email");
      setMessage("Email already exists");
      console.log("Email already exists");
      return false;
    }

    if (updateData && updateData.data && updateData.data.message === "INVALID EMAIL FORMAT") {
        setError("email");
        setMessage("Invalid email format");
        console.log("Invalid email format");
        return false;
    }

    if (updateData && updateData.data && updateData.data.message === "EMAIL CANNOT BE EMPTY") {
        setError("email");
        setMessage("Email cannot be empty");
        console.log("Email cannot be empty");
        return false;
    }

    if (updateData && updateData.data && updateData.data.message === "DATE OF BIRTH CANNOT BE EMPTY") {
        setError("age");
        setMessage("Date of birth cannot be empty");
        console.log("Date of birth cannot be empty");
        return false;
    }

    if (updateData && updateData.data && updateData.data.message === "USER IS UNDER 13") {
      setError("age");
      setMessage("You must be 13 or over");
      console.log("You must be 13 or over");
      return false;
    }

    if (updateData && updateData.data && updateData.data.message === "INVALID YEAR OF BIRTH") {
      setError("age");
        setMessage("Invalid year of birth");
        console.log("Invalid year of birth");
      return false;
    }

    if (updateData && updateData.data && updateData.data.message === "PASSWORDS DONT MATCH") {
        setError("password");
        setMessage("Passwords don't match");
        console.log("Passwords don't match");
        return false;
      }
      if(badcheck(updateData.data.user_firstname)){
        setError("firstname")
        setMessage("Profanity detected in first-name")
        return false;
      }
      if(badcheck(updateData.data.user_lastname)){
        setError("lastname")
        setMessage("Profanity detected in last-name")
        return false;
      }
      if(badcheck(updateData.data.user_username)){
        setError("username")
        setMessage("Profanity detected in username")
        return false;
      }
      if(badcheck(updateData.data.user_email)){
        setError("email")
        setMessage("Profanity detected in email")
        return false;
      }
    

    setEditingSuccess(true);

    if (editingSuccess) {
      saveDetails();
    }
  };

  const saveDetails = async () => {
    setError("");
    setEditing(false);
    setEditingSuccess(false);
    setShowEditSuccess(true);
    setTimeout(() => setShowEditSuccess(false), 2000);
  };

  // Sign out
  const signOut = async () => {
    // Log out using the logout_user reducer
    dispatch(logout_user());

    // Clear local storage
    localStorage.removeItem("currentPage");

    // Clear session storage
    sessionStorage.clear();

    // Navigate to login page
    navigation.navigate("Login");
  };

  // Display public scrabooks
  const displayPublicSB = () => {
    setShowLabel("Public Scrabooks");
  };

  // Display private scrabooks
  const displayPrivateSB = () => {
    setShowLabel("Private Scrabooks");
  };

  // Display friends list
  const displayFriendsList = () => {
    setShowLabel("Friends List");
  };

  const images = [];
  for (let i = 0; i < 15; i++) {
    images.push(
      <button
        key={i}
        className="mx-1 my-1 "
        onClick={() => {
          navigation.navigate("Image");
        }}
      >
        <img
          src="images/image-placeholder.png"
          className="border-solid border-2 rounded border-black "
          alt="placeholder"
        ></img>
      </button>
    );
  }

  return (
    <div className="dark:bg-dback">
      <div className="grid grid-cols-5 dark:bg-dback">
        {/* Home button */}
        <button
          className="dark:bg-dblue text-black bg-white text-sm font-bold py-1 px-2 rounded-full border-solid border-2 border-black top-3 absolute left-5 "
          type="button"
          onClick={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Map" }],
            });
          }}
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="w-h h-6 inline-block pr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 
        1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Home
        </button>

        {/* Username, Email and password */}
        <div className="col-start-1 col-span-3 row-start-1 pt-20 pl-5 ">
          <label
            htmlFor="firstNameInput"
            className="block text-gray-500 font-bold mb-2 dark:text-white"
          >
            First Name:
          </label>
          <input
            className="text-black dark:text-white dark:bg-dtext dark:border-dbord"
            type="text"
            id="firstNameInput"
            name="firstNameInput"
            disabled={!editing}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          {error === "firstname" && (
            <div className="text-custom-orange dark:text-custom-orange pt-2">
              {Message}
            </div>
          )}

          <label
            htmlFor="lastNameInput"
            className="block text-gray-500 font-bold mb-2 dark:text-white pt-6"
          >
            Last Name:
          </label>
          <input
            className="text-black dark:text-white dark:bg-dtext dark:border-dbord"
            type="text"
            id="lastNameInput"
            name="lastNameInput"
            disabled={!editing}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {error === "lastname" && (
            <div className="text-custom-orange dark:text-custom-orange pt-2">
              {Message}
            </div>
          )}
          <label
            className="block text-gray-500 font-bold mb-2 dark:text-white pt-6"
            htmlFor="usernameLabel"
          >
            Username:{" "}
          </label>
          <input
            className="text-black dark:text-white dark:bg-dtext dark:border-dbord"
            type="text"
            id="username-input"
            name="usernameInput"
            disabled={!editing}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {error === "username" && (
            <div className="text-custom-orange dark:text-custom-orange pt-2">
              {Message}
            </div>
          )}

          <label
            className="block text-gray-500 font-bold mb-2 pt-6 dark:text-white"
            htmlFor="emailLabel"
          >
            Email:{" "}
          </label>
          <input
            className="text-black dark:text-white dark:bg-dtext dark:border-dbord"
            type="email"
            id="email-input"
            name="emailLabel"
            disabled={!editing}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error === "email" && (
            <div className="text-custom-orange dark:text-custom-orange pt-2">
              {Message}
            </div>
          )}
        </div>
        <div className="col-start-4 col-span-2 row-start-1 row-span-1 pt-3 pr-5 ">
          {/* Profile picture*/}
          <div className="flex justify-center pb-2">
            <button onClick={changeProfilePicture}>
              <img
                src={profileImage}                className="border-solid border-2 border-black rounded"
                alt="profile"
              ></img>
            </button>
          </div>

          {showEditSuccess && (
        <div className="bg-custom-blue text-white p-2 mb-2 rounded-md text-sm text-center">
          Changes saved 
        </div>
      )}
          <button
            className={`bg-gray-400 hover:bg-gray-500 text-white pr-2 pl-2 pb-2 mb-2 rounded-md focus:outline-none focus:shadow-outline pt-2 text-sm w-full ${
              editing ? "bg-custom-blue hover:bg-custom-blue" : ""
            }`}
            type="button"
            onClick={editDetails}
          >
            {editing ? "Save changes" : "Edit details"}
          </button>

          {/* Sing out button */}
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white pr-2 pl-2 pb-2 rounded-md
        focus:outline-none focus:shadow-outline pt-2 text-sm w-full"
            type="button"
            onClick={signOut}
          >
            Sign out{" "}
          </button>

          {/* Delete account button */}
          <button
            className="bg-custom-orange text-white pr-2 pl-2 pb-2 mt-6 rounded-md
        focus:outline-none focus:shadow-outline pt-2 text-sm w-full"
            type="button"
            onClick={deleteAccountPopup}
          >
            Delete account{" "}
          </button>

          <label
            className="block text-gray-500 font-bold mb-2 mt-6 dark:text-white mx-auto"
            htmlFor="dobLabel"
          >
            Date of Birth:{" "}
          </label>
          <input
            className="text-black bg-white dark:text-white dark:bg-dtext dark:border-dbord"
            type="date"
            id="dob-input"
            name="dobInput"
            min={minDateStr}
            max={maxDateStr}
            pattern="^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/(1|2)[0-9]{3}$"
            disabled={!editing}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          {error === "age" && (
            <div className="text-custom-orange dark:text-custom-orange pt-2">
              {Message}
            </div>
          )}
        </div>

        {editing && (
          <>
            <div className="col-start-1 col-span-3 row-start-2 row-span-1 pl-5 pt-3">
              <label
                className="block text-gray-500 font-bold mb-2 pt-3 dark:text-white"
                htmlFor="passwordLabel"
              >
                New Password:{" "}
              </label>
              <input
                className="text-black dark:text-white dark:bg-dtext dark:border-dbord"
                type="password"
                id="password-input"
                name="passwordInput"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              {error === "password" && (
                <div className="text-custom-orange dark:text-custom-orange pt-2">
                  {Message}
                </div>
              )}
            </div>
            <div className="col-start-4 col-span-2 row-start-2 row-span-1 pr-5 mr-5 pt-3">
              <label
                className="block text-gray-500 font-bold mb-2 pt-3 dark:text-white"
                htmlFor="passwordConfirmLabel"
              >
                Confirm:{" "}
              </label>
              <input
                className="text-black dark:text-white dark:bg-dtext dark:border-dbord"
                type="password"
                id="password-confirm-input"
                name="passwordConfirmInput"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </>
        )}

        {/* Scrapbooks and friends buttons */}
        <div className="col-start-1 col-span-5 row-start-3 row-span-1 pb-3 pt-6 dark:bg-dback">
          <div className="flex ml-5 mr-5 justify-center">
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-2 rounded-md focus:outline-none focus:shadow-outline text-sm mr-5 w-32"
              type="button"
              onClick={() => displayPublicSB()}
            >
              Public Scrapbooks
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-2 rounded-md focus:outline-none focus:shadow-outline text-sm mr-5 w-32"
              type="button"
              onClick={() => displayPrivateSB()}
            >
              Private Scrapbooks
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-2 rounded-md focus:outline-none focus:shadow-outline text-sm w-32"
              type="button"
              onClick={() => displayFriendsList()}
            >
              Friends
            </button>
          </div>
        </div>
      </div>

      {/* Gallery to display scrapbooks or friends list */}
      <div>
        <div className="row-span-1 col-span-5 h-16 dark:bg-dback ">
          <hr className="w-full border-2 border-custom-orange col-span-5 mt-2" />
          <label
            className="block text-gray-500 font-bold mb-2 ml-5 mt-2"
            htmlFor="galleryLabel"
          >
            {showLabel}
          </label>
          <hr className="w-full border-2 border-custom-orange col-span-5 mt-2" />
        </div>
      </div>
      <div className="grid grid-cols-5">{images}</div>

      {showDeletePopup && (
        <>
          <div
            className="fixed inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 py-64 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Delete account
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete your account? This
                          action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={deleteAccount}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={cancelDelete}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showChangeProfilePicture && (
        <>
          <div
            className="fixed inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 py-64 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Change profile picture
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Select a new profile picture.
                        </p>
                        <FileUploader
                          multiple={false}
                          handleChange={(file: File) => setProfilePictureFile(file)}
                          name="file"
                          types={['JPEG', 'PNG', 'GIF']}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-400 text-base font-medium text-white hover:bg-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={changeProfilePicture}
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={cancelChangeProfilePicture}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
