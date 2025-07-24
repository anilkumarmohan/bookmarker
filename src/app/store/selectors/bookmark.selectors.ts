import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarkState } from '../states/bookmark.state';
import { Bookmark } from '../../models/bookmark.model';

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
export const selectSelectedBookmarkId = createSelector(
  selectBookmarkState,
  (state: BookmarkState) => state.selectedBookmarkId
);
export const selectSelectedBookmark = createSelector(
  selectAllBookmarks,
  selectSelectedBookmarkId,
  (bookmarks, selectedId) =>
    selectedId ? bookmarks.find((b) => b.id === selectedId) : null
);

export const selectSearchText = createSelector(
  selectBookmarkState,
  (state: BookmarkState) => state.searchText
);

export const selectFilteredBookmarks = createSelector(
  selectAllBookmarks,
  selectSearchText,
  (bookmarks: Bookmark[], searchText?: string) => {
    if (!searchText) return bookmarks;
    return bookmarks.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(searchText.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchText.toLowerCase())
    );
  }
);
