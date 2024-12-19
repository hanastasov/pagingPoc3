import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGX_CARD_DIRECTIVES, IgxButtonDirective, IgxIconButtonDirective, IgxIconComponent, IgxOverlayOutletDirective, IgxPaginatorComponent, IgxRippleDirective, IgxToggleActionDirective, IgxToggleDirective } from 'igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { CategoryDtoPagedResultDto } from '../models/northwind/category-dto-paged-result-dto';
import { NORTHWINDService } from '../services/northwind.service';

@Component({
  selector: 'app-card',
  imports: [IGX_CARD_DIRECTIVES, IgxButtonDirective, IgxIconButtonDirective, IgxIconComponent, IgxOverlayOutletDirective, IgxPaginatorComponent, IgxRippleDirective, IgxToggleActionDirective, IgxToggleDirective],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _paginator_Page_Index: number = 0;
  public get paginator_Page_Index(): number {
    return this._paginator_Page_Index;
  }
  public set paginator_Page_Index(value: number) {
    this._paginator_Page_Index = value;
    this.paginator_Data_Request$.next();
  }

  private _grid_Page_Index: number = 0;
  public get grid_Page_Index(): number {
    return this._grid_Page_Index;
  }
  public set grid_Page_Index(value: number) {
    this._grid_Page_Index = value;
    this.grid_Data_Request$.next();
  }

  private _grid_Page_Size: number = 15;
  public get grid_Page_Size(): number {
    return this._grid_Page_Size;
  }
  public set grid_Page_Size(value: number) {
    this._grid_Page_Size = value;
    this.grid_Data_Request$.next();
  }

  private _paginator_Page_Size: number = 3;
  public get paginator_Page_Size(): number {
    return this._paginator_Page_Size;
  }
  public set paginator_Page_Size(value: number) {
    this._paginator_Page_Size = value;
    this.paginator_Data_Request$.next();
  }
  public grid_Data_Request?: CategoryDtoPagedResultDto;
  public grid_Data_Request$: Subject<void> = new Subject<void>();

  public paginator_Data_Request?: CategoryDtoPagedResultDto;
  public paginator_Data_Request$: Subject<void> = new Subject<void>();

  constructor(private nORTHWINDService: NORTHWINDService) { }

  ngOnInit() {
    this.nORTHWINDService.getCategoryDtoPagedResultDto(this.grid_Page_Index as any, this.grid_Page_Size as any, '').pipe(takeUntil(this.destroy$)).subscribe(data => this.grid_Data_Request = data);
    this.grid_Data_Request$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.nORTHWINDService.getCategoryDtoPagedResultDto(this.grid_Page_Index as any, this.grid_Page_Size as any, '').pipe(take(1)).subscribe(data => this.grid_Data_Request = data);
    });
    this.nORTHWINDService.getCategoryDtoPagedResultDto(this.paginator_Page_Index as any, this.paginator_Page_Size as any, '').pipe(takeUntil(this.destroy$)).subscribe(data => this.paginator_Data_Request = data);
    this.paginator_Data_Request$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.nORTHWINDService.getCategoryDtoPagedResultDto(this.paginator_Page_Index as any, this.paginator_Page_Size as any, '').pipe(take(1)).subscribe(data => this.paginator_Data_Request = data);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.grid_Data_Request$.complete();
    this.paginator_Data_Request$.complete();
    this.destroy$.complete();
  }

  public paginatorPerPageChange(event: number) {
    this.paginator_Page_Size = event as number;
  }

  public paginatorPageChange(event: number) {
    this.paginator_Page_Index = event as number;
  }
}
