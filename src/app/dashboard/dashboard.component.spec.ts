import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { RegistrationComponent } from '../registration/registration/registration.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let button: HTMLButtonElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'registration', component: RegistrationComponent },
        ]),
      ],
      declarations: [DashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have button "Become a member"', fakeAsync(() => {
    expect(button.innerText).toBe('Become a member');
  }));
});
