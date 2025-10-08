import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login-component';
import { AuthService } from '../../core/services/auth.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginComponent, ReactiveFormsModule],
            providers: [AuthService]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        fixture.detectChanges();
    });

    it('should show error when email is empty', () => {
        const emailField = component.loginForm.get('email');
        emailField?.setValue('');
        expect(emailField?.hasError('required')).toBe(true);
    });


    it('should show error when email format is wrong', () => {
        const emailField = component.loginForm.get('email');
        emailField?.setValue('dummy-email');
        expect(emailField?.hasError('email')).toBe(true);
    });


    it('should show error when password is empty', () => {
        const passwordField = component.loginForm.get('password');
        passwordField?.setValue('');
        expect(passwordField?.hasError('required')).toBe(true);
    });

    it('should call authService.login when form is valid', () => {
        spyOn(authService, 'login');
        component.loginForm.patchValue({
            email: 'admin@a.com',
            password: 'Admin@12'
        });

        component.onSubmit();

        expect(authService.login).toHaveBeenCalledWith('admin@a.com', 'Admin@12');
    });


});