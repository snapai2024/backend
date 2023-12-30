import vision from '@google-cloud/vision';
import { google } from '@google-cloud/vision/build/protos/protos';
import IAnnotateImageResponse = google.cloud.vision.v1.IAnnotateImageResponse;

export interface ImageService {
    analyse(imagePath: string): Promise<IAnnotateImageResponse>;
}

class _ImageService implements ImageService {
    /**
     * Send image to Google Cloud Vision AI API
     */
    public async analyse(imagePath: string): Promise<IAnnotateImageResponse> {
        const client = new vision.ImageAnnotatorClient({
            keyFilename: './src/common/config/gcpkey.json'
        });

        const [result] = await client.labelDetection(imagePath);

        return result;
    }
}

export const ImageService: ImageService = new _ImageService();
