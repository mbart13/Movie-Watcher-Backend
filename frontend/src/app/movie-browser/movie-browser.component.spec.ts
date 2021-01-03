import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBrowserComponent } from './movie-browser.component';

describe('MovieBrowserComponent', () => {
  let component: MovieBrowserComponent;
  let fixture: ComponentFixture<MovieBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
