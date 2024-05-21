import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeWrapperComponent } from './resize-wrapper.component';

describe('ResizeWrapperComponent', () => {
  let component: ResizeWrapperComponent;
  let fixture: ComponentFixture<ResizeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResizeWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResizeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
