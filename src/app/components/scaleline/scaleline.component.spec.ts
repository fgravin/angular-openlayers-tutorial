import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalelineComponent } from './scaleline.component';

describe('ScalelineComponent', () => {
  let component: ScalelineComponent;
  let fixture: ComponentFixture<ScalelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScalelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScalelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
