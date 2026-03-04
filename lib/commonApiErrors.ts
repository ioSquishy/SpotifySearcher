/**
 * Creates a Response object with json message of "error: Missing query parameter (paramName)"
 * with return code 400
 * @param paramName 
 * @returns Response object
 */
export function createMissingParamResponse(paramName: string) : Response {
  return new Response(
    JSON.stringify(
    { 
      error: `Missing query parameter '${paramName}'` 
    }),
    {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}