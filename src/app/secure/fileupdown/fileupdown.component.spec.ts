import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileupdownComponent } from './fileupdown.component';

describe('FileupdownComponent', () => {
  let component: FileupdownComponent;
  let fixture: ComponentFixture<FileupdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileupdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileupdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
