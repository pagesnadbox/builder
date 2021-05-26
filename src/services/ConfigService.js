import Service from "./Service";
export default class ConfigService extends Service {

    static get headers() {
        return {
            'Content-Type': 'application/json',
        }
    }

    static saveConfig({ config = {} } = {}, onError) {
        return this.fetch(`${this.API_URL}/project/config/save/`, {
            method: "POST",
            body: JSON.stringify({
                config,
            })
        }, onError);
    }

    static fetchConfig(onError) {
        return this.fetch(`${this.API_URL}/project/config/fetch/`, onError);
    }

    static fetchProjects(onError) {
        return this.fetch(`${this.API_URL}/project/list`, onError);
    }

    static fetchProject(onError) {
        return this.fetch(`${this.API_URL}/project`, onError);
    }

    static createProject(data, onError) {
        return this.fetch(`${this.API_URL}/project/create`, {
            method: "POST",
            body: JSON.stringify(data)
        }, onError);
    }

    static editProject(data, onError) {
        return this.fetch(`${this.API_URL}/project/edit`, {
            method: "POST",
            body: JSON.stringify(data)
        }, onError);
    }

    static editProject(data, onError) {
        return this.fetch(`${this.API_URL}/project/edit`, {
            method: "POST",
            body: JSON.stringify(data)
        }, onError);
    }

    static removeProject(onError) {
        return this.fetch(`${this.API_URL}/project/remove`, {
            method: "POST",
        }, onError);
    }
}