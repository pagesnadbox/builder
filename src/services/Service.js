import { getDomain } from "./DomainService";

const apiURL = `${getDomain()}/pagesandbox/api/v1`;
export default class Service {

    static get API_URL() {
        return apiURL;
    }

    static get headers() {
        return {
            // set default headers here
        }
    }

    static async fetch(url, { body, method = "GET" } = {}, onError) {
        try {
            const options = {
                method,
                headers: this.headers
            };

            if (body) {
                options.body = body;
            }

            const promise = await fetch(url, options);
            const response = await promise.json();

            if (response.success === false) {
                onError && onError(response)
            }

            return response;

        } catch (error) {
            onError && onError({ message: error })
        }
    }
}