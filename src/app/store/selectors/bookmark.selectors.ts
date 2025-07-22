import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarkState } from '../states/bookmark.state';

export const selectBookmarkState =
  createFeatureSelector<BookmarkState>('bookmarks');

export const selectAllBookmarks = createSelector(
  selectBookmarkState,
  (state: BookmarkState) => state.bookmarks
);
export const selectBookmarkError = createSelector(
  selectBookmarkState,
  (state: BookmarkState) => state.error
);
export const selectBookmarkLoading = createSelector(
  selectBookmarkState,
  (state: BookmarkState) => state.loading
);
