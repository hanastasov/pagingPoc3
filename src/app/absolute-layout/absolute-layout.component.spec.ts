import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IgxButtonDirective, IgxRippleDirective, IgxPaginatorComponent } from 'igniteui-angular';
import { AbsoluteLayoutComponent } from './absolute-layout.component';

describe('AbsoluteLayoutComponent', () => {
  let component: AbsoluteLayoutComponent;
  let fixture: ComponentFixture<AbsoluteLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AbsoluteLayoutComponent, NoopAnimationsModule, FormsModule, HttpClientTestingModule, IgxButtonDirective, IgxRippleDirective, IgxPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsoluteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
