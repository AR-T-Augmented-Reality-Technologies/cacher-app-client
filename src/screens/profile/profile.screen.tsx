import React, { useState } from "react";
import { Button, View, ImageBackground } from "react-native";

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [enabled, setEnabled] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showChangeProfilePicture, setShowChangeProfilePicture] =
    useState(false);

  // Delete account
  const deleteAccountPopup = () => {
    setShowDeletePopup(!showDeletePopup);
  };

  // Delete account
  const deleteAccount = () => {
    //TODO delete account

    // Show delete account popup
    setShowDeletePopup(!showDeletePopup);
  };

  // Cancel delete account
  const cancelDelete = () => {
    setShowDeletePopup(!showDeletePopup);
  };

  // Change profile picture
  const changeProfilePicture = () => {
    setShowChangeProfilePicture(!showChangeProfilePicture);
    console.log("Change profile picture");
  };

  // Cancel change profile picture
  const cancelChangeProfilePicture = () => {
    setShowChangeProfilePicture(!showChangeProfilePicture);
  };

  // Edit account details
  const editDetails = () => {};

  // Sign out
  const signOut = () => {
    //TODO end session
    navigation.navigate("Login");
  };

  // Handle edit button action
  const editButtonHandler = () => {
    if (enabled) {
    } else {
    }
    setEnabled(!enabled);
  };

   // Display public scrabooks
   const displayPublicSB = () => {
// Temporary solution to render placeholder public scrabooks
  const numOfImages = 15;
  const images = [];
  for (let i = 0; i < numOfImages; i++) {
    images.push(
      <button key={i} className="mx-1 my-1" onClick={() => {navigation.navigate("Image")}}>
        <img
          src="images/image-placeholder.png"
          className="border-solid border-2 rounded border-black"
        ></img>
      </button>
    );

   };
    return images;
}
  // Display private scrabooks
  const displayPrivateSB = () => {};

  // Display friends list
  const displayFriendsList = () => {};

  return (
    <>
      <div className="grid grid-cols-5">
        {/* Home button */}
        <button
          className=" text-black bg-white text-sm font-bold py-1 px-2 rounded-full border-solid border-2 border-black top-3 absolute left-5 "
          type="button"
          onClick={() => {
            navigation.navigate("Map");
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
        <div className="col-start-1 col-span-3 row-start-1 pt-20 pl-5">
          <label
            className="block text-gray-500 font-bold mb-2"
            htmlFor="usernameLabel"
          >
            Username:{" "}
          </label>
          <input
            className="text-black"
            type="text"
            id="username-input"
            name="usernameInput"
            disabled={enabled}
          />

          <label
            className="block text-gray-500 font-bold mb-2 pt-6 "
            htmlFor="emailLabel"
          >
            Email:{" "}
          </label>
          <input
            className="text-black"
            type="email"
            id="email-input"
            name="emailLabel"
            disabled={enabled}
          />

          <label
            className="block text-gray-500 font-bold mb-2 pt-6"
            htmlFor="paswordLabel"
          >
            Password:{" "}
          </label>
          <input
            className="text-black"
            type="password"
            id="password-input"
            name="passwordInput"
            disabled={enabled}
          />
        </div>

        {/* Name and DoB */}
        <div className="col-start-1 col-span-5 row-start-2 pt-6 pl-5 flex h-16">
          <div>
            <label
              className="block text-gray-500 font-bold mb-2"
              htmlFor="nameLabel"
            >
              Name:{" "}
            </label>
            <input
              className="text-black"
              type="text"
              id="name-input"
              name="nameInput"
              disabled={enabled}
            />
          </div>
          <div className="ml-5">
            <label
              className="block text-gray-500 font-bold mb-2"
              htmlFor="dobLabel"
            >
              Date of Birth:{" "}
            </label>
            <input
              className="text-black bg-white"
              type="date"
              id="dob-input"
              name="dobInput"
              disabled={enabled}
            />
          </div>
        </div>

        {/* Profile picture*/}
        <div className="col-start-4 col-span-2 row-start-1 row-span-1 pt-3 pr-5 pb-2">
          <button onClick={changeProfilePicture}>
            <img
              src="images/avatar-image.jpg"
              className="border-solid border-2 border-black rounded"
            ></img>
          </button>

          {/* Edit my info button */}
          <button
            className={` ${
              enabled
                ? "bg-gray-400 hover:bg-gray-500"
                : "bg-green-400 hover:bg-green-500"
            }  text-white pr-2 pl-2 pb-2 mb-2 rounded-md
        focus:outline-none focus:shadow-outline pt-2 text-sm w-full`}
            type="button"
            onClick={editButtonHandler}
          >
            {enabled ? "Edit details" : "Save "}
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
            className="bg-red-500 hover:bg-red-700 text-white pr-2 pl-2 pb-2 mt-6 rounded-md
        focus:outline-none focus:shadow-outline pt-2 text-sm w-full"
            type="button"
            onClick={deleteAccountPopup}
          >
            Delete account{" "}
          </button>
        </div>

        {/* Scrapbooks and friends buttons */}
        <div className="col-start-1 col-span-5 row-start-2 row-span-1 pt-28 pb-3">
          <div className="flex ml-5 mr-5">
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-2 rounded-md focus:outline-none focus:shadow-outline text-sm mr-5 w-32"
              type="button"
              onClick={() => displayPublicSB()}
            >
              Public Scrabooks
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-2 rounded-md focus:outline-none focus:shadow-outline text-sm mr-5 w-32"
              type="button"
              onClick={() => displayPrivateSB()}
            >
              Private Scrabooks
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

      <div className="grid grid-cols-5"></div>
      {/* Gallery to display scrapbooks or friends list */}
      <div className="grid grid-cols-5">
        <div className="row-span-1 col-span-5 h-16">
          <hr className="w-full border-2 border-custom-orange col-span-5 mt-2" />
          <label
            className="block text-gray-500 font-bold mb-2 ml-5 mt-2"
            htmlFor="galleryLabel"
          >
            Public Scrapbooks{" "}
          </label>
          <hr className="w-full border-2 border-custom-orange col-span-5 mt-2" />
        </div>
        {displayPublicSB()}
      </div>

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
    </>
  );
};
