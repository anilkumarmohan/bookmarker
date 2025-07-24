import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../../models/bookmark.model';

export const loadBookmarks = createAction('[Bookmark] Load Bookmarks');

export const loadBookmarksSuccess = createAction(
  '[Bookmark] Load Bookmarks Success',
  props<{ bookmarks: Bookmark[] }>()
);

export const loadBookmarksFailure = createAction(
  '[Bookmark] Load Bookmarks Failure',
  props<{ error: any }>()
);

export const addBookmark = createAction(
  '[Bookmark] Add Bookmark',
  props<{ bookmark: Bookmark }>()
);

export const addBookmarkSuccess = createAction(
  '[Bookmark] Add Bookmark Success',
  props<{ bookmark: Bookmark }>()
);

export const addBookmarkFailure = createAction(
  '[Bookmark] Add Bookmark Failure',
  props<{ error: any }>()
);

export const selectBookmark = createAction(
  '[Bookmark] Select Bookmark',
  props<{ id: string | null }>()
);

export const updateBookmark = createAction(
  '[Bookmark] Update Bookmark',
  props<{ bookmark: Bookmark }>()
);

export const updateBookmarkSuccess = createAction(
  '[Bookmark] Update Bookmark Success',
  props<{ bookmark: Bookmark }>()
);

export const updateBookmarkFailure = createAction(
  '[Bookmark] Update Bookmark Failure',
  props<{ error: any }>()
);

export const setSearchText = createAction(
  '[Bookmark] Set Search Text',
  props<{ searchText: string }>()
);
