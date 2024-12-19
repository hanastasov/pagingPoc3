import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { CardComponent } from './card/card.component';
import { AbsoluteLayoutComponent } from './absolute-layout/absolute-layout.component';
import { RowLayoutComponent } from './row-layout/row-layout.component';
import { ColumnLayoutComponent } from './column-layout/column-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'card', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  {
    path: 'card',
    component: CardComponent,
    data: {
      text: 'Card'
    }
  },
  {
    path: 'absolute-layout',
    component: AbsoluteLayoutComponent,
    data: {
      text: 'Absolute Layout'
    }
  },
  {
    path: 'row-layout',
    component: RowLayoutComponent,
    data: {
      text: 'Row Layout'
    }
  },
  {
    path: 'column-layout',
    component: ColumnLayoutComponent,
    data: {
      text: 'Column Layout'
    }
  },
  { path: '**', component: PageNotFoundComponent } // must always be last
];
