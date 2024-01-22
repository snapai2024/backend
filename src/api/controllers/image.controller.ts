import { CustomRequest } from '../../common/entities/customRequest';
import { Response } from 'express';
import { CausalError } from '../../common/errors/causal.error';
import { ImageService } from '../services/image.service';
import { CreateImageDto, Image } from '../models';
import { ImageParser } from '../parsers/image.parser';

export interface ImageController {
    getById(req: CustomRequest, res: Response): Promise<void>;
    analyse(req: CustomRequest, res: Response): Promise<void>;
    create(req: CustomRequest, res: Response): Promise<void>;
    delete(req: CustomRequest, res: Response): Promise<void>;
}

class _ImageController implements ImageController {
    public async getById(req: CustomRequest, res: Response) {
        try {
            const { id } = req.params;

            const image: Image = await ImageService.getById(Number(id));

            res.status(200).json(image);
        } catch (err) {
            res.status(400).json({ error: err as CausalError });
        }
    }

    public async analyse(req: CustomRequest, res: Response) {
        try {

            if (!req.file) throw new CausalError("Vous devez fournir une image à analyser.");

            const { path } = req.file;

            const result = await ImageService.analyse(path);

            const labels = result.labelAnnotations;

            res.status(200).json(labels);
        } catch (err) {
            res.status(400).json({ error: err as CausalError });
        }
    }

    public async create(req: CustomRequest, res: Response) {
        try {
            if (!req.file) throw new CausalError("Vous devez fournir une image.");

            const { name, description, labels, collectionId } = JSON.parse(req.body.image);
            const { path } = req.file;

            const input: CreateImageDto = {
                name: name,
                description: description,
                path: path,
                labels: JSON.stringify(labels),
                collectionId: collectionId
            };

            const imageToCreate: Image = ImageParser.parseIn(input);

            const createdImage: Image = await ImageService.create(imageToCreate);

            res.status(201).json(createdImage);
        } catch (err) {
            res.status(400).json({ error: err as CausalError });
        }
    }

    public async delete(req: CustomRequest, res: Response) {
        try {
            const { id } = req.params;

            await ImageService.deleteById(Number(id));

            res.status(200).send();
        } catch (err) {
            res.status(400).json({ error: err as CausalError });
        }
    }
}

export const ImageController: ImageController = new _ImageController();