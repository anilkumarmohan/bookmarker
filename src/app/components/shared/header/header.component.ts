import { Component } from '@angular/core';
import { FilterBookmarkComponent } from "../filter-bookmark/filter-bookmark.component";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FilterBookmarkComponent, MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // openNav() {
  //   document.getElementById('menuSidenav')!.style.width = '200px';
  // }

  // closeNav() {
  //   document.getElementById('menuSidenav')!.style.width = '0';
  // }
}
