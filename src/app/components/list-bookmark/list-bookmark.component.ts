import { Component, DestroyRef, Inject, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { map, Observable, tap } from 'rxjs';
import { Bookmark } from '../../models/bookmark.model';
import { Store } from '@ngrx/store';
import * as BookmarkSelector from '../../store/selectors/bookmark.selectors';
import { loadBookmarks } from '../../store/actions/bookmark.actions';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as BookmarkActions from '../../store/actions/bookmark.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

type BookmarkGroup = { label: string; bookmarks: Bookmark[] };

@Component({
  selector: 'app-list-bookmark',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIcon,
    MatTooltipModule,
    AsyncPipe,
    RouterLink,
    MatProgressSpinner,
  ],
  templateUrl: './list-bookmark.component.html',
  styleUrl: './list-bookmark.component.css',
})
export class ListBookmarkComponent {
  groupedBookmarks$: Observable<BookmarkGroup[]>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  filterText$!: Observable<string>;
  store = inject(Store);
  destroyRef = inject(DestroyRef);
  _snackBar = inject(MatSnackBar);
  duration = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor() {
    this.filterText$ = this.store
      .select(BookmarkSelector.selectSearchText)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((searchText) => searchText || '')
      );
    this.groupedBookmarks$ = this.store
      .select(BookmarkSelector.selectFilteredBookmarks)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((bookmarks: any[]) => {
          const groups: { [label: string]: Bookmark[] } = {};
          bookmarks.forEach((b) => {
            const label = this.getDateValue(b.creationDate);
            if (!groups[label]) groups[label] = [];
            groups[label].push(b);
          });
          return Object.keys(groups).map((label) => ({
            label,
            bookmarks: groups[label].sort(
              (a, b) =>
                new Date(b.creationDate).getTime() -
                new Date(a.creationDate).getTime()
            ),
          }));
        })
      );

    this.isLoading$ = this.store
      .select(BookmarkSelector.selectBookmarkLoading)
      .pipe(takeUntilDestroyed(this.destroyRef));

    this.error$ = this.store.select(BookmarkSelector.selectBookmarkError).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((error) => {
        if (error) {
          this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
            duration: this.duration * 1000,
            data: {
              message: 'Unable to fetch bookmarks. Please try again later.',
              isError: true,
            },
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadBookmarks());
  }

  getDateValue(timeStamp: any): string {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let occurance = 0;
    var dt = new Date(timeStamp),
      date = dt.getDate(),
      month = months[dt.getMonth()],
      timeDiff = timeStamp - Date.now(),
      diffDays = new Date().getDate() - date,
      diffMonths = new Date().getMonth() - dt.getMonth(),
      diffYears = new Date().getFullYear() - dt.getFullYear();

    if (diffYears === 0 && diffDays === 0 && diffMonths === 0) {
      occurance = occurance + 1;
      return 'Today';
    } else if (diffYears === 0 && diffDays === 1) {
      return 'Yesterday';
    } else {
      return 'Older';
    }
  }

  onAction(id: string | null) {
    this.store.dispatch(BookmarkActions.selectBookmark({ id }));
  }
}

@Component({
  selector: 'snack-bar-annotated-component-example-snack',
  templateUrl: '../shared/app-message.html',
  styles: `
    :host {
      display: flex;
    }

    .error {
      color: red;
    }
  `,
  imports: [MatButtonModule, MatSnackBarLabel],
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string; isError: boolean }
  ) {}
}
