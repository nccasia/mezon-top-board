import { BadRequestException } from "@nestjs/common";

import { EntityMetadata, FindOptionsWhere, In, Like } from "typeorm";

/**
 * Builds a where condition for keyword search.
 * @param keyword - The search keyword.
 * @param fields - The fields to search in.
 * @returns A FindOptionsWhere condition.
 */
export const searchBuilder = <T>(input: { keyword: string, fields: (keyof T)[] }): FindOptionsWhere<T>[] => {
    const { keyword, fields } = input;

    if (!keyword) return [];

    return fields.map(field => ({ [field]: Like(`%${keyword}%`) })) as FindOptionsWhere<T>[];
};

/**
 * Builds a TypeORM where condition based on the provided field and fieldId.
 * Supports direct columns, One-to-One, Many-to-One, One-to-Many, and Many-to-Many relations.
 *
 * @param entityMetadata - TypeORM metadata of the entity
 * @param field - The field name to filter by
 * @param fieldId - The ID value for filtering
 * @returns A TypeORM where condition object
 */
export const filterBuilder = <T>(
    entityMetadata: EntityMetadata,
    field: string,
    fieldId: string
): FindOptionsWhere<T> => {
    // 🔹 Get all valid properties (direct columns + relations)
    const validColumns = entityMetadata.columns.map(col => col.propertyName);
    const validRelations = entityMetadata.relations.map(rel => rel.propertyName);

    // 🔹 Validate if the field exists
    if (!validColumns.includes(field) && !validRelations.includes(field)) {
        throw new BadRequestException(
            `Invalid field: ${field}`
        );
    }

    // 🔹 If the field is a direct column (e.g., tagId, userId)
    if (validColumns.includes(field)) {
        return { [field]: fieldId } as FindOptionsWhere<T>;
    }

    // 🔹 If the field is a relation (One-to-One, Many-to-One, One-to-Many, Many-to-Many)
    const relationMetadata = entityMetadata.relations.find(rel => rel.propertyName === field);

    if (!relationMetadata) {
        throw new BadRequestException(`Invalid relation field: ${field}`);
    }

    if (relationMetadata.isManyToMany) {
        // 🔹 Many-to-Many relations need an `In` clause
        return { [field]: { id: In([fieldId]) } } as FindOptionsWhere<T>;
    } else {
        // 🔹 One-to-One, Many-to-One, One-to-Many relations (regular `id` match)
        return { [field]: { id: fieldId } } as FindOptionsWhere<T>;
    }
};