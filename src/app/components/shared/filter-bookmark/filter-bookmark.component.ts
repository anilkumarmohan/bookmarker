import { Component, DestroyRef, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as BookmarkActions from '../../../store/actions/bookmark.actions';
import * as BookmarkSelectors from '../../../store/selectors/bookmark.selectors';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filter-bookmark',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './filter-bookmark.component.html',
  styleUrl: './filter-bookmark.component.css',
})
export class FilterBookmarkComponent {
  private store = inject(Store);
  searchText$!: Observable<string>;
  private searchInput = new Subject<string>();
  destroyRef = inject(DestroyRef);
  constructor() {
    this.searchInput
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((searchText) => {
        this.store.dispatch(BookmarkActions.setSearchText({ searchText }));
      });

    this.searchText$ = this.store
      .select(BookmarkSelectors.selectSearchText)
      .pipe(map((text) => text || ''));
  }
  oninit(): void {
    this.searchInput.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    );
  }
  onSearch(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    this.searchInput.next(input.value.trim().toLowerCase());
  }
}
