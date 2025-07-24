import { Bookmark } from '../../models/bookmark.model';

export interface BookmarkState {
  selectedBookmarkId: string | null;
  bookmarks: Bookmark[];
  searchText?: string
  loading: boolean;
  error: string | null;
}

export const initialState: BookmarkState = {
  bookmarks: [],
  searchText: '',
  loading: false,
  error: null,
  selectedBookmarkId: null
};