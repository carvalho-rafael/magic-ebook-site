export async function fetcher(
  accessToken: string,
  url: string,
  options: RequestInit
) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  return fetch(url, mergedOptions);
}
