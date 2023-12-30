import { CustomRequest } from '../../common/entities/customRequest';
import { Response } from 'express';
import { CausalError } from '../../common/errors/causal.error';
import { ImageService } from '../services/image.service';

export interface ImageController {
    analyse(req: CustomRequest, res: Response): any;
}

class _ImageController implements ImageController {

    public async analyse(req: CustomRequest, res: Response) {
        try {

            if (!req.file) throw new CausalError("Vous devez fournir une image à analyser.");

            const { path } = req.file;

            const result = await ImageService.analyse(path);

            res.status(200).json(result);
        } catch (err) {
            console.log(err)
            res.status(400).json({ error: err as CausalError });
        }
    }
}

export const ImageController: ImageController = new _ImageController();