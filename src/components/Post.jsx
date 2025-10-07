import React from "react";

export default function Post({ content, user, date }) {
  return (
    <div className="bg-secondary rounded-lg p-6 mb-2">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
          {user?.toUpperCase().charAt(0)}
        </div>
        <div className="flex space-x-2 items-center">
          <span className="text-white font-semibold">{user}</span>
          <span className="text-light/60 text-xs">@{user.toLowerCase()}</span>
          <span className="text-light-dark text-xs">
            · {new Date(date).toDateString()}
          </span>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-base leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
