let cachedToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Return cached or new Spotify Bearer Token
 * Reference https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
 * @returns token as a string
 */
export async function getSpotifyBearerToken(): Promise<string> {
  const nowEpochMilli = Date.now();
  // substract 5 minutes (300k in milli) as a safety buffer
  if (cachedToken && nowEpochMilli < tokenExpiry - 300000) {
    console.log("Using cached Spotify token");
    return cachedToken;
  }
  
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    throw new Error("Missing Spotify credentials in environment variables.");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to fetch Spotify token: ${response.status} ${errorBody}`);
  }

  const data = await response.json();

  if (!data.access_token) {
    throw new Error("Spotify response did not include an access token.");
  }

  cachedToken = data.access_token;
  tokenExpiry = nowEpochMilli + (data.expires_in * 1000); // multiply by 1k to get in milliseconds

  return data.access_token;

}