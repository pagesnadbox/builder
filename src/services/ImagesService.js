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

    get BASE_URL() {
        return domain
    }

    transformURL({ assetName }) {
        if (this.defaultImages.indexOf(assetName) > -1) {
            return assetName;
        }

        return `${this.BASE_URL}/images/${assetName}`;

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