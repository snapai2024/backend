import { Collection } from '../models';
import { BusinessError } from '../../common/errors/business.error';

export interface CollectionService {
    getById(id: number): Promise<Collection>;
    create(input: Collection): Promise<Collection>;
    deleteById(id: number): Promise<void>;
}

class _CollectionService implements CollectionService {
    /**
     * Get a specific collection by its id.
     *
     * @param id
     */
    public async getById(id: number): Promise<Collection> {
        const image = await Collection.findByPk(id);

        if (!image) throw new BusinessError('Collection does not exists.');

        return image;
    }

    /**
     * Create new collection model.
     */
    public async create(input: Collection): Promise<Collection> {
        const createdCollection = await Collection.create({
            name: input.name,
        });

        return createdCollection.reload();
    }

    /**
     * Deletes a specific collection by id and all of its images.
     *
     * @param id
     */
    public async deleteById(id: number): Promise<void> {
        const collection = await Collection.findByPk(id);

        if (!collection) throw new BusinessError('Collection does not exists.');

        await collection.destroy();
    }
}

export const CollectionService: CollectionService = new _CollectionService();
