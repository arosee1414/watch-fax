import Client from './generatedClient';

export default class WatchFaxClient extends Client {
    constructor(
        authToken: string,
        baseUrl: string = process.env.NODE_ENV === 'production'
            ? 'https://watch-fax-e7dya4a5fpe9e7ht.eastus-01.azurewebsites.net'
            : 'http://10.0.0.210:5107',
        http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        }
    ) {
        const customFetch = async (url: RequestInfo, init?: RequestInit) => {
            // Create a new Headers object and set the authorization header with the bearer token
            const headers = new Headers(init?.headers);
            headers.append('Authorization', `Bearer ${authToken}`);

            // Make the fetch request with the modified headers
            return (
                http?.fetch(url, {
                    ...init,
                    headers,
                    credentials: 'include',
                }) ?? fetch(url, { ...init, headers, credentials: 'include' })
            );
        };

        super(baseUrl, { fetch: customFetch });
    }

}
