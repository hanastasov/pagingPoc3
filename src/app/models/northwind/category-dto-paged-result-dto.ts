import { CategoryDto } from './category-dto';

export interface CategoryDtoPagedResultDto {
  items: CategoryDto[];
  totalRecordsCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}
