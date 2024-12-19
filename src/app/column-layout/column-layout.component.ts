import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGX_CARD_DIRECTIVES, IgxButtonDirective, IgxIconButtonDirective, IgxIconComponent, IgxOverlayOutletDirective, IgxPaginatorComponent, IgxRippleDirective, IgxToggleActionDirective, IgxToggleDirective } from 'igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { CategoryDtoPagedResultDto } from '../models/northwind/category-dto-paged-result-dto';
import { NORTHWINDService } from '../services/northwind.service';

@Component({
  selector: 'app-column-layout',
  imports: [IGX_CARD_DIRECTIVES, IgxButtonDirective, IgxIconButtonDirective, IgxIconComponent, IgxOverlayOutletDirective, IgxPaginatorComponent, IgxRippleDirective, IgxToggleActionDirective, IgxToggleDirective],
  templateUrl: './column-layout.component.html',
  styleUrls: ['./column-layout.component.scss']
})
export class ColumnLayoutComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public paginator_Data_Request3?: CategoryDtoPagedResultDto;
  public paginator_Data_Request3$: Subject<void> = new Subject<void>();

  private _paginator_Page_Size3: number = 3;
  public get paginator_Page_Size3(): number {
    return this._paginator_Page_Size3;
  }
  public set paginator_Page_Size3(value: number) {
    this._paginator_Page_Size3 = value;
    this.paginator_Data_Request3$.next();
  }

  private _paginator_Page_Index3: number = 0;
  public get paginator_Page_Index3(): number {
    return this._paginator_Page_Index3;
  }
  public set paginator_Page_Index3(value: number) {
    this._paginator_Page_Index3 = value;
    this.paginator_Data_Request3$.next();
  }

  constructor(private nORTHWINDService: NORTHWINDService) { }

  ngOnInit() {
    this.nORTHWINDService.getCategoryDtoPagedResultDto(this.paginator_Page_Index3 as any, this.paginator_Page_Size3 as any, '').pipe(takeUntil(this.destroy$)).subscribe(data => this.paginator_Data_Request3 = data);
    this.paginator_Data_Request3$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.nORTHWINDService.getCategoryDtoPagedResultDto(this.paginator_Page_Index3 as any, this.paginator_Page_Size3 as any, '').pipe(take(1)).subscribe(data => this.paginator_Data_Request3 = data);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.paginator_Data_Request3$.complete();
    this.destroy$.complete();
  }

  public paginatorPageChange(event: number) {
    this.paginator_Page_Index3 = event as number;
  }

  public paginatorPerPageChange(event: number) {
    this.paginator_Page_Size3 = event as number;
  }
}
