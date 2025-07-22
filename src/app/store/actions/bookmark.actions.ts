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