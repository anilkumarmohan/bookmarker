import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/bookmarks',
    pathMatch: 'full',
  },
  {
    path: 'bookmarks',
    loadComponent: () =>
      import('./components/list-bookmark/list-bookmark.component').then((x) => x.ListBookmarkComponent),
  },
  {
    path: 'bookmarks/useraction',
    loadComponent: () =>
      import('./components/update-bookmark/update-bookmark.component').then(
        (x) => x.UpdateBookmarkComponent
      ),
  },
  {
    path: 'bookmarks/useraction/:id',
    loadComponent: () =>
      import('./components/update-bookmark/update-bookmark.component').then(
        (x) => x.UpdateBookmarkComponent
      ),
  },
];
