import { Component, OnDestroy, OnInit } from '@angular/core';
import { IgxPaginatorComponent } from 'igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { CategoryDtoPagedResultDto } from '../models/northwind/category-dto-paged-result-dto';
import { NORTHWINDService } from '../services/northwind.service';

@Component({
  selector: 'app-row-layout',
  imports: [IgxPaginatorComponent],
  templateUrl: './row-layout.component.html',
  styleUrls: ['./row-layout.component.scss']
})
export class RowLayoutComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public paginator_Data_Request2?: CategoryDtoPagedResultDto;
  public paginator_Data_Request2$: Subject<void> = new Subject<void>();

  private _paginator_Page_Index2: number = 1;
  public get paginator_Page_Index2(): number {
    return this._paginator_Page_Index2;
  }
  public set paginator_Page_Index2(value: number) {
    this._paginator_Page_Index2 = value;
    this.paginator_Data_Request2$.next();
  }

  private _paginator_Page_Size2: number = 2;
  public get paginator_Page_Size2(): number {
    return this._paginator_Page_Size2;
  }
  public set paginator_Page_Size2(value: number) {
    this._paginator_Page_Size2 = value;
    this.paginator_Data_Request2$.next();
  }

  constructor(private nORTHWINDService: NORTHWINDService) { }

  ngOnInit() {
    this.nORTHWINDService.getCategoryDtoPagedResultDto(this.paginator_Page_Index2 as any, this.paginator_Page_Size2 as any, '').pipe(takeUntil(this.destroy$)).subscribe(data => this.paginator_Data_Request2 = data);
    this.paginator_Data_Request2$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.nORTHWINDService.getCategoryDtoPagedResultDto(this.paginator_Page_Index2 as any, this.paginator_Page_Size2 as any, '').pipe(take(1)).subscribe(data => this.paginator_Data_Request2 = data);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.paginator_Data_Request2$.complete();
    this.destroy$.complete();
  }

  public paginatorPerPageChange(event: number) {
    this.paginator_Page_Size2 = event as number;
  }

  public paginatorPageChange(event: number) {
    this.paginator_Page_Index2 = event as number;
  }
}
