import { Component, DestroyRef, Inject, inject, signal } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import * as BookmarkActions from '../../store/actions/bookmark.actions';
import { Store } from '@ngrx/store';
import { Bookmark } from '../../models/bookmark.model';
import { Observable } from 'rxjs';
import * as BookmarkSelectors from '../../store/selectors/bookmark.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarLabel,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-bookmark',
  imports: [
    HeaderComponent,
    MatButtonModule,
    MatIcon,
    ReactiveFormsModule,
    MatInputModule,
  ],
  standalone: true,
  templateUrl: './update-bookmark.component.html',
  styleUrl: './update-bookmark.component.css',
})
export class UpdateBookmarkComponent {
  isEditmode = signal(false);
  bookmarkId = signal(0);
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);
  selectedBookmark$: Observable<Bookmark | null | undefined> | undefined;
  destroyRef = inject(DestroyRef);
  _snackBar = inject(MatSnackBar);
  duration = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  createBookmarkForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    url: new FormControl('', [
      Validators.required,
      Validators.pattern('https?://.+'),
    ]),
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.bookmarkId.set(Number(params.get('id')));
        this.isEditmode.set(this.bookmarkId() > 0);
      });
    this.selectedBookmark$ = this.store.select(
      BookmarkSelectors.selectSelectedBookmark
    );
    this.selectedBookmark$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((bookmark) => {
        if (bookmark) {
          this.createBookmarkForm.patchValue(bookmark);
        }
      });
  }
  onSubmit() {
    if (this.createBookmarkForm.valid) {
      let message: string;
      if (this.isEditmode()) {
        let requestData: Bookmark = {
          id: this.bookmarkId().toString(),
          title: this.createBookmarkForm.value.title ?? '',
          url: this.createBookmarkForm.value.url ?? '',
          creationDate: this.getTimestamp(),
        };
        this.store.dispatch(
          BookmarkActions.updateBookmark({ bookmark: requestData })
        );
        message = 'Bookmark updated successfully!';
      } else {
        let requestData: Bookmark = {
          id: Math.floor(Math.random() * 1000).toString(),
          title: this.createBookmarkForm.value.title ?? '',
          url: this.createBookmarkForm.value.url ?? '',
          creationDate: this.getTimestamp(),
        };
        this.store.dispatch(
          BookmarkActions.addBookmark({ bookmark: requestData })
        );
        message = 'Bookmark added successfully!';
      }

      this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
        duration: this.duration * 1000,
        data: {
          message,
          isError: false,
        },
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
  getTimestamp() {
    let myDate = new Date().toLocaleDateString();
    const myDateParts = myDate.split('/');
    let newDate = new Date(
      Number(myDateParts[2]),
      Number(myDateParts[1]) - 1,
      Number(myDateParts[0])
    );
    return newDate.getTime();
  }

  onCancel() {
    this.router.navigate(['/bookmarks']);
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
    .success {
      color: green;
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
