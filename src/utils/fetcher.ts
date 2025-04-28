export async function fetcher(
  url: string,
  options: RequestInit,
  accessToken?: string
) {
  const defaultHeaders = accessToken
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    : undefined;

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, mergedOptions);
}
