import Service from "./Service";
export default class ConfigService extends Service {

    static get headers() {
        return {
            'Content-Type': 'application/json',
        }
    }

    static saveConfig({ config = {}, id = "" } = {}, onError) {
        return this.fetch(`${this.API_URL}/projects/config/save/`, {
            method: "POST",
            body: JSON.stringify({
                config,
                id
            })
        }, onError);
    }

    static fetchConfig({ id = "" } = {}, onError) {
        return this.fetch(`${this.API_URL}/projects/config/fetch/${id}`, onError);
    }

    static fetchProjects(onError) {
        return this.fetch(`${this.API_URL}/projects/list`, onError);
    }

    static fetchProject({ id }, onError) {
        return this.fetch(`${this.API_URL}/projects/${id}`, onError);
    }

    static createProject(data, onError) {
        return this.fetch(`${this.API_URL}/projects/create`, {
            method: "POST",
            body: JSON.stringify(data)
        }, onError);
    }

    static editProject(data, onError) {
        return this.fetch(`${this.API_URL}/projects/edit`, {
            method: "POST",
            body: JSON.stringify(data)
        }, onError);
    }

    static editProject(data, onError) {

        return this.fetch(`${this.API_URL}/projects/edit`, {
            method: "POST",
            body: JSON.stringify(data)
        }, onError);
    }

    static removeProject(data, onError) {
        return this.fetch(`${this.API_URL}/projects/remove`, {
            method: "POST",
            body: JSON.stringify(data)
        }, onError);
    }
}