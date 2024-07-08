import { clone } from "lodash";
import { Query } from "mongoose";

export interface TFilter {
  perPage?: number;
  page?: number;
  sortBy?: string;
  sortType?: "asc" | "desc";
  [key: string]: any;
}

const defaultOptions: TFilter = { perPage: 10, page: 1 };

/**
 * Paginate a mongoose query result
 * @param query The query you want to paginate
 * @param options Pagination options like page number and/or items per page
 * @returns Paginated query with metadata
 */
export const handleFilter = async <T>(
  query: Query<any, T>,
  { perPage, page, sortBy, sortType, ...others }: TFilter = defaultOptions,
) => {
  const _query = clone(query);
  const _perPage = Number(perPage) || defaultOptions.perPage;
  const _page = Number(page) || defaultOptions.page;

  // Apply sorting if sortBy and sortType are provided
  if (sortBy && sortType) {
    _query.sort({ [sortBy]: sortType === "asc" ? 1 : -1 });
  }

  // Apply other search criteria
  Object.entries(others).forEach(([key, value]) => {
    if (value) {
      _query.where(key).equals(value);
    }
  });

  const total = await _query.countDocuments().exec();
  const lastPage = Math.ceil(total / _perPage);
  const data = await query
    .limit(_perPage)
    .skip(_perPage * (_page - 1))
    .exec();

  return {
    data,
    meta: { total, perPage: _perPage, page: _page, lastPage },
  };
};
