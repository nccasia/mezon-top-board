import { Result } from "@domain/common/dtos/result.dto";

export const paginate = async <T, R>(
    repositoryQuery: () => Promise<[T[], number]>,
    pageSize: number = 10,
    pageNumber: number = 1,
    mapper?: (entity: T) => R,
): Promise<Result<R[]>> => {
    const [data, totalCount] = await repositoryQuery();

    const totalPages = Math.ceil(totalCount / pageSize);
    const hasPreviousPage = pageNumber > 1;
    const hasNextPage = pageNumber < totalPages;

    const mappedData = mapper ? data.map(mapper) : (data as unknown as R[]);

    return {
        data: mappedData,
        pageSize:
            pageSize > totalCount && pageNumber === 1 ? totalCount : pageSize,
        pageNumber,
        totalPages,
        totalCount,
        hasPreviousPage,
        hasNextPage,
    };
};
