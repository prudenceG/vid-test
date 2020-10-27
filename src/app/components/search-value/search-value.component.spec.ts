import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchValueComponent } from './search-value.component';

describe('SearchValueComponent', () => {
  let component: SearchValueComponent;
  let fixture: ComponentFixture<SearchValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
