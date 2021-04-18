export default class ConfigService {

    static get API_URL() {
        return `/pagesandbox/api/v1`
    }

    static async save({ config = {}, id = "" } = {}) {
        try {
            let response = await fetch(`${ConfigService.API_URL}/projects/config/save/`, {
                method: "POST",
                body: JSON.stringify({
                    config,
                    id
                })
            });

            return response.json();

        } catch (error) {
            console.error(error)
        }
    }

    static async fetch({ id = "" } = {}) {
        try {
            let response = await fetch(`${ConfigService.API_URL}/projects/config/fetch/${id}`);

            return response.json();
        } catch (error) {
            console.error(error)
        }
    }
}