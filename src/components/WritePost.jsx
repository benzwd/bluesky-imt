import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { postMessage } from "../api";
import { useAuth } from "react-oidc-context";

export default function WritePost() {
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const auth = useAuth();
  const username = auth.user?.profile?.["cognito:username"];
  const token = auth.user?.access_token;

  const maxLength = 280;

  const handleSubmit = async () => {
    if (!postText.trim()) return;
    if (postText.length <= 0 || postText.length > 280) return;
    if (!auth.user?.access_token) return;

    setLoading(true);
    try {
      const data = {
        content: postText.trim(),
        username: auth.user?.profile?.["cognito:username"],
      };
      await postMessage(data, token);
      setPostText("");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    } catch (e) {
      alert("Erreur : " + e);
    } finally {
      setLoading(false);
    }
  };
  return auth.isAuthenticated ? (
    <div className="bg-secondary rounded-lg p-6 mb-2">
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
          {username?.toUpperCase().charAt(0)}
        </div>
        <div className="flex-1">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Quoi de neuf ?"
            className="w-full bg-primary rounded-lg p-2 text-light placeholder-light-dark text-lg resize-none outline-none"
            rows="3"
            maxLength={maxLength}
          />
        </div>
      </div>
      <div className="flex items-center justify-end space-x-4">
        {postText.length > 0 && (
          <div className="relative w-8 h-8">
            <svg className="w-8 h-8 transform -rotate-90">
              <circle
                cx="16"
                cy="16"
                r="14"
                strokeWidth="3"
                fill="none"
                className="stroke-light"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${
                  (postText.length / maxLength) * 87.96
                } 87.96`}
                className={`transition-all ${
                  postText.length >= maxLength ? "stroke-red" : "stroke-accent"
                }`}
              />
            </svg>
            {postText.length >= maxLength - 20 && (
              <span
                className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
                  postText.length >= maxLength ? "text-red" : "text-light-dark"
                }`}
              >
                {maxLength - postText.length}
              </span>
            )}
          </div>
        )}
        <button
          disabled={postText.trim().length === 0 || loading}
          className={`px-6 py-2 rounded-lg font-bold text-sm transition-all duration-500 ${
            postText.trim().length > 0
              ? "bg-accent text-white hover:bg-primary cursor-pointer"
              : "bg-secondary/30 text-light-dark cursor-not-allowed"
          }`}
          onClick={handleSubmit}
        >
          {loading ? "Envoi..." : "Publier"}
        </button>
      </div>
      <div className="mb-4"></div>
    </div>
  ) : null;
}
