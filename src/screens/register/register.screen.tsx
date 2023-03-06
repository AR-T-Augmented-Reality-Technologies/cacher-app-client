import { useState, useEffect } from "react";

interface RegisterScreenProps {
  navigation: any;
}
// nig
export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [currentPage, setCurrentPage] = useState("Register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [registerCheckbox, setRegisterCheckbox] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isValidLength, setIsValidLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);

    setIsValidLength(value.length >= 8);
    setHasUppercase(/[A-Z]/.test(value));
    setHasNumber(/\d/.test(value));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(value));
  };

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

  const validateForm = (e: any) => {
    e.preventDefault();
    const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // eslint-disable-next-line
    const regex_password = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if (!email) {
      setError("email");
      setMessage("Please enter your email address");
      return false;
    } else if (!regex_email.test(email)) {
      setError("email");
      setMessage("Invalid email format");
      return false;
    }

    if (!password) {
      setError("password");
      setMessage("Please enter a password");
      return false;
    } else if (!regex_password.test(password)) {
      setError("password");
      setMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter, have at least one number and at least one special character."
      );
      return false;
    }

    if (!passwordConfirm) {
      setError("passwordConfirm");
      setMessage("Please confirm your password");
      return false;
    } else if (password !== passwordConfirm) {
      setError("passwordConfirm");
      setMessage("Passwords do not match");
      return false;
    }

    if (!username) {
      setError("username");
      setMessage("Please enter a username");
      return false;
    }

    if (!firstname) {
      setError("firstname");
      setMessage("Please enter your first name");
      return false;
    }

    if (!lastname) {
      setError("lastname");
      setMessage("Please enter your last name");
      return false;
    }

    if (!dob) {
      setError("dob");
      setMessage("Please enter your date of birth");
      return false;
    }
    if (!registerCheckbox) {
      setError("checkbox");
      setMessage("Please agree to the terms and conditions");
      return false;
    }

    return true;
  };

  const submitForm = () => {
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      dob: dob,
      username: username,
    };

    fetch(`${process.env.REACT_APP_REST_API_HOST}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res);
    // .then((data) => {
    //     // Set our user
    //     return data;
    //

    navigation.navigate("Login");
  };

  return (
    <>
      <div className="grid grid-cols-8 min-h-screen dark:bg-dback">
        {/* Left column to display the back button*/}
        {/* The arrow icon on back button will only appear when viewed on larger screens due to limited column size on mobile*/}
        <div className="col-start-1 col-span-1 mt-2 ml-2">
          <button
            className="bg-custom-blue hover:bg-custom-blue-hover dark:bg-dblue hover:dark:bg-dorange text-white font-bold py-2 px-4 rounded
                focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              navigation.navigate("Login");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hidden md:inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>

        {/* Middle column with the logo and register form */}
        <div className="col-start-2 col-span-6">
          <img
            src="images/cacher-logo.png"
            alt="Logo"
            className="w-1/2 md:w-1/6 mx-auto mt-4"
          ></img>
          <form className="w-full max-w-sm sm:w-full mt-4 mx-auto">
            <div className="mb-4">
              <label
                className="dark:text-white block text-gray-500 font-bold mb-2"
                htmlFor="emailLabel"
              >
                Email
              </label>
              <input
                className="dark:bg-dtext dark:border-dbord dark:text-white bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue"
                id="email-input"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {error === "email" && (
                <div className="text-custom-orange dark:text-custom-orange pt-2">
                  {message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="dark:text-white block text-gray-500 font-bold mb-2"
                htmlFor="usernameLabel"
              >
                Username
              </label>
              <input
                className="dark:bg-dtext dark:border-dbord dark:text-white  bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue"
                id="username-input"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              {error === "username" && (
                <div className="text-custom-orange dark:text-custom-orange pt-2">
                  {message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="dark:text-white block text-gray-500 font-bold mb-2"
                htmlFor="passwordLabel"
              >
                Password
              </label>
              <input
                className="dark:bg-dtext dark:border-dbord dark:text-white bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue"
                id="password-input"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              {password.length > 0 && (
                <div className="justify-start mt-2">
                  <div
                    className={`flex items-center ${
                      isValidLength ? "text-custom-blue" : "text-gray-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Minimum 8 characters long
                  </div>
                  <div
                    className={`flex items-center ${
                      hasUppercase ? "text-custom-blue" : "text-gray-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    At least one uppercase character
                  </div>
                  <div
                    className={`flex items-center ${
                      hasNumber ? "text-custom-blue" : "text-gray-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    At least one number
                  </div>
                  <div
                    className={`flex items-center ${
                      hasSpecialChar ? "text-custom-blue" : "text-gray-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    At least one special character
                  </div>
                </div>
              )}
              {error === "password" && (
                <div className="text-custom-orange dark:text-custom-orange pt-2">
                  {message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="dark:text-white block text-gray-500 font-bold mb-2"
                htmlFor="passwordLabel"
              >
                Confirm Password
              </label>
              <input
                className="dark:bg-dtext dark:border-dbord dark:text-white  bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue"
                id="confirmPassword-input"
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              {error === "passwordConfirm" && (
                <div className="text-custom-orange dark:text-custom-orange pt-2">
                  {message}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="mb-4">
                <label
                  className="dark:text-white block text-gray-500 font-bold mb-2"
                  htmlFor="fnameLabel"
                >
                  First Name
                </label>
                <input
                  className="dark:bg-dtext dark:border-dbord dark:text-white  bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue"
                  id="fname-input"
                  type="text"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                {error === "firstname" && (
                  <div className="text-custom-orange dark:text-custom-orange pt-2">
                    {message}
                  </div>
                )}
              </div>
              <div className="ml-6 mb-4">
                <label
                  className="dark:text-white block text-gray-500 font-bold mb-2"
                  htmlFor="lnameLabel"
                >
                  Last Name
                </label>
                <input
                  className="dark:bg-dtext dark:border-dbord dark:text-white  bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue"
                  id="lname-input"
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                />
                {error === "lastname" && (
                  <div className="text-custom-orange dark:text-custom-orange pt-2">
                    {message}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label
                className="dark:text-white block text-gray-500 font-bold mb-2"
                htmlFor="dobLabel"
              >
                Date of Birth
              </label>
              <input
                className="dark:bg-dtext dark:border-dbord dark:text-white  bg-gray-200 appearance-none border-2 h-10 border-gray-200 rounded w-full py-2 px-4
                         text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-custom-blue"
                id="dob-input"
                type="date"
                onChange={(e) => setDob(e.target.value)}
              />
              {error === "dob" && (
                <div className="text-custom-orange dark:text-custom-orange pt-2">
                  {message}
                </div>
              )}
            </div>
            <div className="flex">
              <input
                className="form-checkbox accent-custom-blue"
                type="checkbox"
                id="registerCheckbox"
                onChange={(e) => setRegisterCheckbox(e.target.checked)}
              />
              <label
                className="ml-2 dark:text-white"
                htmlFor="registerCheckbox"
              >
                I agree to my details being registered
              </label>
            </div>
            {error === "checkbox" && (
              <div className="text-custom-orange dark:text-custom-orange pt-2">
                {message}
              </div>
            )}
            <div className="flex justify-center mb-8 mt-6">
              <button
                className="bg-custom-blue hover:bg-custom-blue-hover hover:dark:bg-dorange text-white font-bold py-2 px-4 rounded
                        focus:outline-none focus:shadow-outline dark:bg-dblue"
                type="button"
                onClick={(e) => {
                  validateForm(e) && submitForm();
                }}
              >
                Register
              </button>
            </div>
          </form>
        </div>

        {/* A column on the right of the screen to display vertial lines. All 3 lines will be displayed on desktop. On mobile devices only 2 lines will be displayed to save space*/}
        <div className="col-start-8 col-span-1 flex h-full">
          <div className="border-r-2 border-custom-orange dark:border-dorange h-full ml-4"></div>
          <div className="border-r-4 border-custom-orange dark:border-dorange h-full ml-5"></div>
          <div className="hidden md:block border-r-8 border-custom-orange dark:border-dorange h-full ml-6"></div>
        </div>
      </div>
    </>
  );
};
