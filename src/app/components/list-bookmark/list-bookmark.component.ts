import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { Bookmark } from '../../models/bookmark.model';
import { Store } from '@ngrx/store';
import { selectAllBookmarks } from '../../store/selectors/bookmark.selectors';
import { loadBookmarks } from '../../store/actions/bookmark.actions';

@Component({
  selector: 'app-list-bookmark',
  standalone: true,
  imports: [HeaderComponent, MatIcon, MatTooltipModule],
  templateUrl: './list-bookmark.component.html',
  styleUrl: './list-bookmark.component.css',
})
export class ListBookmarkComponent {
  bookmarks$: Observable<Bookmark[]>;
  store = inject(Store);

  constructor() {
    this.bookmarks$ = this.store.select(selectAllBookmarks);
  }

  ngOnInit(): void {
    this.store.dispatch(loadBookmarks());
  }
}
