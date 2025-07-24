import { createReducer, on } from '@ngrx/store';
import { BookmarkState, initialState } from '../states/bookmark.state';
import * as BookmarkAction from '../actions/bookmark.actions';
export const bookmarkReducer = createReducer(
  initialState,
  on(BookmarkAction.loadBookmarksSuccess, (state, { bookmarks }) => ({
    ...state,
    bookmarks: bookmarks,
    loading: false,
    error: null,
  })),
  on(BookmarkAction.loadBookmarksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(BookmarkAction.addBookmark, (state) => ({ ...state, loading: true })),
  on(BookmarkAction.addBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    loading: false,
    bookmarks: [...state.bookmarks, bookmark],
  })),
  on(BookmarkAction.addBookmarkFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(BookmarkAction.selectBookmark, (state, { id }) => ({
    ...state,
    selectedBookmarkId: id,
  })),
  on(BookmarkAction.updateBookmark, (state) => ({ ...state, loading: true })),
  on(BookmarkAction.updateBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    loading: false,
    bookmarks: state.bookmarks.map((b) =>
      b.id === bookmark.id ? bookmark : b
    ),
  })),
  on(BookmarkAction.updateBookmarkFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(BookmarkAction.setSearchText, (state, { searchText }) => ({
    ...state,
    searchText: searchText,
  }))
);
