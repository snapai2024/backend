import { CustomRequest } from '../../common/entities/customRequest';
import { Response } from 'express';
import { CausalError } from '../../common/errors/causal.error';
import { Collection, CreateCollectionDto } from '../models';
import { CollectionService } from '../services/collection.service';
import { CollectionParser } from '../parsers/collection.parser';
import { BusinessError } from '../../common/errors/business.error';

export interface CollectionController {
    getById(req: CustomRequest, res: Response): any;
    create(req: CustomRequest, res: Response): any;
    delete(req: CustomRequest, res: Response): void;
}

class _CollectionController implements CollectionController {
    public async getById(req: CustomRequest, res: Response) {
        try {
            const { id } = req.params;

            const collection: Collection = await CollectionService.getById(Number(id));

            res.status(200).json(collection);
        } catch (err) {
            res.status(400).json({ error: err as CausalError });
        }
    }

    public async create(req: CustomRequest, res: Response) {
        try {
            const { name } = req.body;
            const { id } = req.user!;

            const input: CreateCollectionDto = {
                name: name,
                userId: id
            };

            const collectionToCreate: Collection = CollectionParser.parseIn(input);

            const createdCollection: Collection = await CollectionService.create(collectionToCreate);

            res.status(201).json(createdCollection);
        } catch (err) {
            res.status(400).json({ error: err as CausalError });
        }
    }

    public async delete(req: CustomRequest, res: Response) {
        try {
            const { id } = req.params;

            if (req.user!.collections?.filter((collection) => collection.id === Number(id)).length == 0) {
                throw new BusinessError("This collection is not yours.")
            }

            await CollectionService.deleteById(Number(id));

            res.status(200).send();
        } catch (err) {
            res.status(400).json({ error: err as CausalError });
        }
    }
}

export const CollectionController: CollectionController = new _CollectionController();