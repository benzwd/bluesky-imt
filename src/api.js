export const fetchMessages = async ({ pageParam = null }) => {
  let url =
    "https://w2syzilf91.execute-api.eu-west-1.amazonaws.com/dev/messages";
  if (pageParam) {
    url += `?lastKey=${pageParam}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const result = await res.json();
  const parsed = result.body ? JSON.parse(result.body) : result;

  return {
    items: parsed.items || [],
    hasMore: parsed.hasMore,
    nextKey: parsed.nextKey,
  };
};

export async function postMessage(data, token) {
  console.log("Access Token:", token);

  try {
    const response = await fetch(
      "https://w2syzilf91.execute-api.eu-west-1.amazonaws.com/dev/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi du message");
    }

    return await response.json();
  } catch (err) {
    console.error("Erreur API:", err);
    throw err;
  }
}
