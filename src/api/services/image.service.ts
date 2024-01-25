import vision from '@google-cloud/vision';
import { google } from '@google-cloud/vision/build/protos/protos';
import IAnnotateImageResponse = google.cloud.vision.v1.IAnnotateImageResponse;
import { Image } from '../models';
import { BusinessError } from '../../common/errors/business.error';
import { CollectionService } from './collection.service';

export interface ImageService {
  getById(id: number): Promise<Image>;
  analyse(imagePath: string): Promise<IAnnotateImageResponse>;
  create(input: Image): Promise<Image>;
  deleteById(id: number): Promise<Image>;
}

class _ImageService implements ImageService {
  /**
   * Get a specific image by its id.
   *
   * @param id
   */
  public async getById(id: number): Promise<Image> {
    const image = await Image.findByPk(id);

    if (!image) throw new BusinessError('Image does not exists.');

    return image;
  }

  /**
   * Send image to Google Cloud Vision AI API
   */
  public async analyse(imagePath: string): Promise<IAnnotateImageResponse> {
    const client = new vision.ImageAnnotatorClient({
      keyFilename: './src/common/config/gcpkey.json',
    });

    const [result] = await client.labelDetection(imagePath);

    return result;
  }

  /**
   * Create new image model.
   */
  public async create(input: Image): Promise<Image> {
    try {
      if (!input.collectionId) throw new BusinessError(`Collection ${input.collectionId} does not exists.`);

      const collection = await CollectionService.getById(Number(input.collectionId));

      if (!collection) throw new BusinessError(`Collection ${input.collectionId} does not exists.`);
    } catch (e) {
      throw new BusinessError('Invalid collection.');
    }

    const createdImage = await Image.create({
      name: input.name,
      description: input.description,
      path: input.path,
      labels: input.labels,
      collectionId: input.collectionId,
    });

    return createdImage.reload();
  }

  /**
   * Deletes a specific image by id
   *
   * @param id
   */
  public async deleteById(id: number): Promise<Image> {
    const image = await Image.findByPk(id);

    if (!image) throw new BusinessError('Image does not exists.');

    await image.destroy();

    return image;
  }
}

export const ImageService: ImageService = new _ImageService();
