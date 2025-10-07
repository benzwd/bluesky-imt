export const signOutRedirect = () => {
  const clientId = "7jkbrq2lr1a4ha524cel13ujso";
  const logoutUri = "http://localhost:5173";
  const cognitoDomain =
    "https://eu-west-1ipqpcp46t.auth.eu-west-1.amazoncognito.com";
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutUri
  )}`;
};
