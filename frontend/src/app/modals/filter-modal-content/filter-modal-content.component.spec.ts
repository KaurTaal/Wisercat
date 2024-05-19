import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterModalContentComponent } from './filter-modal-content.component';

describe('FilterModalComponent', () => {
  let component: FilterModalContentComponent;
  let fixture: ComponentFixture<FilterModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterModalContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
