import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Bookmark } from '../models/bookmark.model';
import * as constants from '../constants';
@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private apiUrl = `${constants.API_URL}bookmarks`;
  http = inject(HttpClient);

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.apiUrl);
  }

  //   addBookmark(bookmark: Bookmark): Observable<Bookmark> {
  //     return this.http.post<Bookmark>(this.apiUrl, bookmark);
  //   }

  //   deleteBookmark(id: number): Observable<void> {
  //     return this.http.delete<void>(`${this.apiUrl}/${id}`);
  //   }
}
