export default class ConfigService {

    static get API_URL() {
        return `http://localhost:3000/pagesandbox/api/v1`
    }

    static get headers() {
        return {
            'Content-Type': 'application/json',
        }
    }

    static fetch(url, { body = {}, method = "GET" } = {}) {
        const options = {
            method,
            headers: ConfigService.headers
        };

        if (method !== "GET") {
            options.body = body;
        }

        return fetch(url, options);
    }

    static async saveConfig({ config = {}, id = "" } = {}) {
        try {
            let response = await ConfigService.fetch(`${ConfigService.API_URL}/projects/config/save/`, {
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

    static async fetchConfig({ id = "" } = {}) {
        try {
            let response = await ConfigService.fetch(`${ConfigService.API_URL}/projects/config/fetch/${id}`);

            return response.json();
        } catch (error) {
            console.error(error)
        }
    }

    static async fetchProjects() {
        try {
            const response = await ConfigService.fetch(`${ConfigService.API_URL}/projects/list`);

            return response.json();
        } catch (error) {
            console.error(error)
        }
    }

    static async createProject(data) {
        try {
            const response = await ConfigService.fetch(`${ConfigService.API_URL}/projects/create`, {
                method: "POST",
                body: JSON.stringify(data)
            });

            return response.json();
        } catch (error) {
            console.error(error)
        }
    }

    static async editProject(data) {
        try {
            const response = await ConfigService.fetch(`${ConfigService.API_URL}/projects/edit`, {
                method: "POST",
                body: JSON.stringify(data)
            });

            return response.json();
        } catch (error) {
            console.error(error)
        }
    }

    static async editProject(data) {
        try {
            const response = await ConfigService.fetch(`${ConfigService.API_URL}/projects/edit`, {
                method: "POST",
                body: JSON.stringify(data)
            });

            return response.json();
        } catch (error) {
            console.error(error)
        }
    }

    static async removeProject(data) {
        try {
            const response = await ConfigService.fetch(`${ConfigService.API_URL}/projects/remove`, {
                method: "POST",
                body: JSON.stringify(data)
            });

            return response.json();
        } catch (error) {
            console.error(error)
        }
    }
}