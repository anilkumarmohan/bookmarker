import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BookmarkActions from '../actions/bookmark.actions';
import { BookmarkService } from '../../services/bookmark.service';
import { Router } from '@angular/router';

@Injectable()
export class BookmarkEffects {
  constructor(
    private actions$: Actions,
    private bookmarkService: BookmarkService,
    private store: Store,
    private router: Router
  ) {}

  loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.loadBookmarks),
      switchMap(() =>
        this.bookmarkService.getBookmarks().pipe(
          map((bookmarks) =>
            BookmarkActions.loadBookmarksSuccess({ bookmarks })
          ),
          catchError((error) =>
            of(BookmarkActions.loadBookmarksFailure({ error }))
          )
        )
      )
    )
  );
}
