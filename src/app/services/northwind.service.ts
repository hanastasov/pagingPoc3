import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CategoryDtoPagedResultDto } from '../models/northwind/category-dto-paged-result-dto';
import { ErrorHandlerService } from './error-handler.service';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

@Injectable({
  providedIn: 'root'
})
export class NORTHWINDService {
  constructor(
    private http: HttpClient
  ) { }

  public getCategoryDtoPagedResultDto(pageIndex: number, size: number, orderBy: string): Observable<CategoryDtoPagedResultDto | undefined> {
    const params = new HttpParams()
      .append('pageIndex', pageIndex)
      .append('size', size)
      .append('orderBy', orderBy);
    const options = {
      params,
    };
    return this.http.get<CategoryDtoPagedResultDto | undefined>(`${API_ENDPOINT}/Categories/GetCategoriesWithPage`, options)
      .pipe(catchError(ErrorHandlerService.handleError<CategoryDtoPagedResultDto | undefined>('getCategoryDtoPagedResultDto', undefined)));
  }
}
