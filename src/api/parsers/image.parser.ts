import { Image, ImageDto } from '../models';

export interface ImageParser {
    parseIn(image: Partial<ImageDto>): Image;
}

class _ImageParser {
    parseIn(image: Partial<ImageDto>): Image {
        return Image.build({
            name: image.name,
            description: image.description,
            path: image.path,
            labels: image.labels
        });
    }
}

export const ImageParser: ImageParser = new _ImageParser();
