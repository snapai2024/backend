import { Collection, CollectionDto } from '../models';

export interface CollectionParser {
    parseIn(image: Partial<CollectionDto>): Collection;
}

class _CollectionParser {
    parseIn(collection: Partial<CollectionDto>): Collection {
        return Collection.build({
            name: collection.name,
            userId: collection.userId
        });
    }
}

export const CollectionParser: CollectionParser = new _CollectionParser();
