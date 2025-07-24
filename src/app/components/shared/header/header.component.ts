import { Component, inject, signal } from '@angular/core';
import { FilterBookmarkComponent } from '../filter-bookmark/filter-bookmark.component';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FilterBookmarkComponent, MatIcon, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  route = inject(ActivatedRoute);
  enableFilter = signal(false);

  constructor() {
    this.route.url.subscribe((url) => {
      this.enableFilter.set(false);
      if (url.length === 1) {
        this.enableFilter.set(true);
      }
    });
  }
}
