export default class ConfigService {

    static get API_URL() {
        return `http://localhost:3000/pagesandbox/api/v1`
    }

    static get headers() {
        return {
            'Content-Type': 'application/json',
        }
    }

    static async fetch(url, { body = {}, method = "GET" } = {}, onError) {
        try {
            const options = {
                method,
                headers: ConfigService.headers
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

    static saveConfig({ config = {}, id = "" } = {}, onError) {
        return ConfigService.fetch(`${ConfigService.API_URL}/projects/config/save/`, {
            method: "POST",
            body: JSON.stringify({
                config,
                id
            })
        }, onError);
    }

    static fetchConfig({ id = "" } = {}, onError) {
        return ConfigService.fetch(`${ConfigService.API_URL}/projects/config/fetch/${id}`, onError);
    }

    static fetchProjects(onError) {
        return ConfigService.fetch(`${ConfigService.API_URL}/projects/list`, onError);
    }

    static createProject(data, onError) {
        return ConfigService.fetch(`${ConfigService.API_URL}/projects/create`, {
            method: "POST",
            body: JSON.stringify(data)
        }, onError);
    }

    static editProject(data, onError) {
        return ConfigService.fetch(`${ConfigService.API_URL}/projects/edit`, {
            method: "POST",
            body: JSON.stringify(data)
        }, onError);
    }

    static editProject(data, onError) {

        return ConfigService.fetch(`${ConfigService.API_URL}/projects/edit`, {
            method: "POST",
            body: JSON.stringify(data)
        }, onError);
    }

    static removeProject(data, onError) {
        return ConfigService.fetch(`${ConfigService.API_URL}/projects/remove`, {
            method: "POST",
            body: JSON.stringify(data)
        }, onError);
    }
}