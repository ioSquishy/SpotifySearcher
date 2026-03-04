import { getSpotifyBearerToken } from "../lib/spotify.js";
import { createMissingParamResponse } from "../lib/commonApiErrors.js";

/**
 * Search for an item using https://developer.spotify.com/documentation/web-api/reference/search
 * @param request url formatted as in spotify documentation. supported parameters: 'q', 'type', 'limit'
 * @returns Spotify response
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('q');
    const itemType = searchParams.get("type")
    const limit = searchParams.get("limit");

    if (!searchQuery) return createMissingParamResponse("q");
    if (!itemType) return createMissingParamResponse("type");

    const bearerToken = await getSpotifyBearerToken();
    let requestUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=${itemType}`;
    if (limit) requestUrl += `&limit=${limit}`;

    const queryResult = await fetch(requestUrl, {headers: { Authorization: `Bearer ${bearerToken}` }});
    return Response.json(await queryResult.json());
  } catch (error: any) {
    console.error("Search API Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
