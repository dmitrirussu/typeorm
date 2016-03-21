import {RelationMetadata} from "../../metadata-builder/metadata/RelationMetadata";
import {RelationOptions} from "../../metadata-builder/options/RelationOptions";
import {RelationTypes, ObjectConstructor} from "../../metadata-builder/types/RelationTypes";
import {defaultMetadataStorage} from "../../metadata-builder/MetadataStorage";

/**
 * Many-to-one relation allows to create type of relation when Entity1 can have single instance of Entity2, but
 * Entity2 can have a multiple instances of Entity1. Entity1 is an owner of the relationship, and storages Entity2 id 
 * on its own side.
 */
export function ManyToOne<T>(typeFunction: (type?: any) => ObjectConstructor<T>, options?: RelationOptions): Function;

/**
 * Many-to-one relation allows to create type of relation when Entity1 can have single instance of Entity2, but
 * Entity2 can have a multiple instances of Entity1. Entity1 is an owner of the relationship, and storages Entity2 id
 * on its own side.
 */
export function ManyToOne<T>(typeFunction: (type?: any) => ObjectConstructor<T>,
                             inverseSide?: string|((object: T) => any),
                             options?: RelationOptions): Function;

/**
 * Many-to-one relation allows to create type of relation when Entity1 can have single instance of Entity2, but
 * Entity2 can have a multiple instances of Entity1. Entity1 is an owner of the relationship, and storages Entity2 id
 * on its own side.
 */
export function ManyToOne<T>(typeFunction: (type?: any) => ObjectConstructor<T>,
                              inverseSideOrOptions?: string|((object: T) => any)|RelationOptions,
                              options?: RelationOptions): Function {
    let inverseSideProperty: string|((object: T) => any);
    if (typeof inverseSideOrOptions === "object") {
        options = <RelationOptions> inverseSideOrOptions;
    } else {
        inverseSideProperty = <string|((object: T) => any)> inverseSideOrOptions;
    }

    return function (object: Object, propertyName: string) {

        if (!options)
            options = {};

        defaultMetadataStorage.addRelationMetadata(new RelationMetadata({
            target: object.constructor,
            propertyName: propertyName,
            relationType: RelationTypes.MANY_TO_ONE,
            type: typeFunction,
            inverseSideProperty: inverseSideProperty,
            isOwning: true,
            options: options
        }));
    };
}