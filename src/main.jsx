import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "react-oidc-context";

const queryClient = new QueryClient();
const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_ipQpcp46t",
  client_id: "7jkbrq2lr1a4ha524cel13ujso",
  redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "email openid",
  post_logout_redirect_uri: "http://localhost:5173",
  automaticSilentRenew: true,
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
