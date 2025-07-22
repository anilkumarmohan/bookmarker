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
  }))
);
