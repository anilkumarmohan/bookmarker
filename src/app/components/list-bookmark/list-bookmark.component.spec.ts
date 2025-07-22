import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookmarkComponent } from './list-bookmark.component';

describe('ListBookmarkComponent', () => {
  let component: ListBookmarkComponent;
  let fixture: ComponentFixture<ListBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBookmarkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
