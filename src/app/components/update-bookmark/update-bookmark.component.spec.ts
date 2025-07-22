import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookmarkComponent } from './update-bookmark.component';

describe('UpdateBookmarkComponent', () => {
  let component: UpdateBookmarkComponent;
  let fixture: ComponentFixture<UpdateBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBookmarkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
