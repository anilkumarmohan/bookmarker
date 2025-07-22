import { Bookmark } from '../../models/bookmark.model';

export interface BookmarkState {
  bookmarks: Bookmark[];
  loading: boolean;
  error: string | null;
}

export const initialState: BookmarkState = {
  bookmarks: [],
  loading: false,
  error: null,
};