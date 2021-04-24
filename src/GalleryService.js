import Service from "./Service";

export default class GalleryService extends Service {

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

    static clearAll({ id }) {
        return GalleryService.fetch(`${GalleryService.API_URL}/projects/${id}/images/clear`, {
            method: "DELETE",
        });
    }

}