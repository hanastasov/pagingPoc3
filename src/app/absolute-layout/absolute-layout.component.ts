import { Component, OnDestroy, OnInit } from '@angular/core';
import { IgxButtonDirective, IgxOverlayOutletDirective, IgxPaginatorComponent, IgxRippleDirective, IgxToggleActionDirective, IgxToggleDirective } from 'igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { CategoryDtoPagedResultDto } from '../models/northwind/category-dto-paged-result-dto';
import { NORTHWINDService } from '../services/northwind.service';

@Component({
  selector: 'app-absolute-layout',
  imports: [IgxButtonDirective, IgxOverlayOutletDirective, IgxPaginatorComponent, IgxRippleDirective, IgxToggleActionDirective, IgxToggleDirective],
  templateUrl: './absolute-layout.component.html',
  styleUrls: ['./absolute-layout.component.scss']
})
export class AbsoluteLayoutComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _paginator_Page_Size1: number = 5;
  public get paginator_Page_Size1(): number {
    return this._paginator_Page_Size1;
  }
  public set paginator_Page_Size1(value: number) {
    this._paginator_Page_Size1 = value;
    this.paginator_Data_Request1$.next();
  }
  public paginator_Data_Request1?: CategoryDtoPagedResultDto;
  public paginator_Data_Request1$: Subject<void> = new Subject<void>();

  private _paginator_Page_Index1: number = 0;
  public get paginator_Page_Index1(): number {
    return this._paginator_Page_Index1;
  }
  public set paginator_Page_Index1(value: number) {
    this._paginator_Page_Index1 = value;
    this.paginator_Data_Request1$.next();
  }

  constructor(private nORTHWINDService: NORTHWINDService) { }

  ngOnInit() {
    this.nORTHWINDService.getCategoryDtoPagedResultDto(this.paginator_Page_Index1 as any, this.paginator_Page_Size1 as any, '').pipe(takeUntil(this.destroy$)).subscribe(data => this.paginator_Data_Request1 = data);
    this.paginator_Data_Request1$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.nORTHWINDService.getCategoryDtoPagedResultDto(this.paginator_Page_Index1 as any, this.paginator_Page_Size1 as any, '').pipe(take(1)).subscribe(data => this.paginator_Data_Request1 = data);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.paginator_Data_Request1$.complete();
    this.destroy$.complete();
  }

  public paginatorPageChange(event: number) {
    this.paginator_Page_Index1 = event as number;
  }

  public paginatorPerPageChange(event: number) {
    this.paginator_Page_Size1 = event as number;
  }
}
