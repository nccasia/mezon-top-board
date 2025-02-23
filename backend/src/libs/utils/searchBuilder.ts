import { FindOptionsWhere, Like } from "typeorm";

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
