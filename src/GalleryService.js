export default class GalleryService {

    static get API_URL() {
        return `http://localhost:3000/pagesandbox/api/v1`
    }

    static get headers() {
        return {
            // set default headers here
        }
    }

    static async fetch(url, { body = {}, method = "GET" } = {}, onError) {
        try {
            const options = {
                method,
                headers: GalleryService.headers
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

    static upload({ id = "", files = [] } = {}, onError) {
        const formData = new FormData();

        Object.keys(files).forEach(key => {
            formData.append("files", files[key].file);
        });

        return GalleryService.fetch(`${GalleryService.API_URL}/projects/${id}/images`, {
            method: "POST",
            body: formData
        });
    }

}