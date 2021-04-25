import { getDomain } from "@/services/DomainService";

const domain = getDomain();

const defaultImages = [
    '/assets/pagesandbox_logo.png',
    '/assets/office_bg.jpg',
    '/assets/logo.svg',
    '/assets/omurtag-logo-light.png',
];

let imageService = null;

class ImagesService {
    get defaultImages() {
        return defaultImages;
    }

    set projectId(value) {
        this._projectId = value
    }

    get projectId() {
        return this._projectId;
    }

    transformURL({ assetName }) {
        if (this.defaultImages.indexOf(assetName) > -1 || !this.projectId) {
            return assetName;
        }

        return `${domain}/${this.projectId}/images/${assetName}`;
    }
}

export default class ImagesServiceSingleton {
    static getInstance() {
        if (!imageService) {
            imageService = new ImagesService();
        }

        return imageService;
    }
}