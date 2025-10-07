import React from "react";
import userPlaceholder from "../assets/placeholder-user.jpg";
import logo from "../assets/logo.png";
import { useAuth } from "react-oidc-context";

export default function Sidebar() {
  const auth = useAuth();
  const username = auth.user?.profile?.["cognito:username"];

  return (
    <div className="flex flex-col w-1/5 mx-8">
      <div className="h-18 flex items-center mb-4 gap-2">
        <img src={logo} alt="Logo" className="h-10 w-10" />
        <span className="text-xl font-bold">BlueSky</span>
      </div>

      <div className="flex flex-col rounded-lg bg-secondary p-8 gap-10 items-center">
        {auth.isAuthenticated ? (
          <>
            <div className="flex flex-col items-center gap-0.5 w-full">
              <img
                src={userPlaceholder}
                alt="image de profil"
                className="rounded-full h-18 mb-2"
              />
              <div className="text-xl text-white w-full truncate text-center">
                {username}
              </div>
              <div className="text-xs text-light-dark w-full truncate text-center">
                @{username?.toLowerCase()}
              </div>
            </div>

            <div className="flex gap-6 w-full justify-center">
              <div className="flex flex-col items-center text-sm text-light-dark">
                Tweets
                <span className="text-light mt-2">389</span>
              </div>
              <div className="flex flex-col items-center text-sm text-light-dark">
                Followers
                <span className="text-light mt-2">389</span>
              </div>
              <div className="flex flex-col items-center text-sm text-light-dark">
                Following
                <span className="text-light mt-2">389</span>
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={() => auth.signinRedirect()}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-secondary cursor-pointer"
          >
            <span className="hidden lg:inline text-sm font-medium">Login</span>
          </button>
        )}
      </div>
    </div>
  );
}
