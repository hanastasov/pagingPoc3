import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IGX_CARD_DIRECTIVES, IgxButtonDirective, IgxRippleDirective, IgxIconButtonDirective, IgxIconComponent, IgxPaginatorComponent } from 'igniteui-angular';
import { ColumnLayoutComponent } from './column-layout.component';

describe('ColumnLayoutComponent', () => {
  let component: ColumnLayoutComponent;
  let fixture: ComponentFixture<ColumnLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ColumnLayoutComponent, NoopAnimationsModule, FormsModule, HttpClientTestingModule, IGX_CARD_DIRECTIVES, IgxButtonDirective, IgxRippleDirective, IgxIconButtonDirective, IgxIconComponent, IgxPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
