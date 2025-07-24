import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
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
            bookmarks.sort(
              (a, b) =>
                new Date(b.creationDate).getTime() -
                new Date(a.creationDate).getTime()
            )
          ),
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

  addBookmark$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.addBookmark),
        mergeMap((action) =>
          this.bookmarkService.addBookmark(action.bookmark).pipe(
            map((bookmark) => BookmarkActions.addBookmarkSuccess({ bookmark })),
            tap(() => this.router.navigate(['/bookmarks'])),
            catchError((error) =>
              of(BookmarkActions.addBookmarkFailure({ error }))
            )
          )
        )
      ),
    { dispatch: false }
  );

  updateBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.updateBookmark),
      mergeMap((action) =>
        this.bookmarkService.updateBookmark(action.bookmark).pipe(
          map((bookmark) =>
            BookmarkActions.updateBookmarkSuccess({ bookmark })
          ),
          tap(() => this.router.navigate(['/bookmarks'])),
          catchError((error) =>
            of(BookmarkActions.updateBookmarkFailure({ error }))
          )
        )
      )
    )
  );
}
