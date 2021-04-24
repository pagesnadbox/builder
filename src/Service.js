const domain = window.location.origin.replace("8081", "3000");
const apiURL = `${domain}/pagesandbox/api/v1`;

export default class Service {

    static get API_URL() {
        return apiURL;
    }

    static get headers() {
        return {
            // set default headers here
        }
    }

    static async fetch(url, { body = {}, method = "GET" } = {}, onError) {
        debugger
        try {
            const options = {
                method,
                headers: Service.headers
            };

            if (method !== "GET") {
                options.body = body;
            }

            const response = await fetch(url, options);

            return response.json();
        } catch (error) {
            onError && onError({ message: error })
        }
    }
}