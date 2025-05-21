export async function fetcher(
  url: string,
  options: RequestInit,
  accessToken?: string
) {
  const defaultHeaders = accessToken
    ? {
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

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, mergedOptions);
}
