import { RouterOutlet } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatioErrorForms } from '../../../shared/directives/validate-error-form.module';
import { ERROR_FORMS } from '../../../shared/constant/error-form';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginDto } from '../../models/login.dto';

@Component({
  selector: 'app-auth-dump',
  imports: [ValidatioErrorForms, FormsModule, ReactiveFormsModule,MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatIconModule, MatListModule,MatGridListModule, MatBadgeModule,MatSidenavModule],
  templateUrl: './auth-dump.component.html',
  styleUrl: './auth-dump.component.scss'
})
export class AuthDumpComponent {

  debounceTime?: NodeJS.Timeout;

  
  private formBuilder: FormBuilder = new FormBuilder();
  form: FormGroup = new FormGroup({});    
  erroresDefs?: typeof ERROR_FORMS =  ERROR_FORMS;
  constructor() {
    this.initForm();
  }

  @Output() loginEvent = new EventEmitter();


  initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      captcha: [null]
    })
  }

  validateForm(): void {
    if(this.form?.valid){
      this.login();
   }
  }

  login(){
    this.form?.disable();
    if(this.debounceTime) clearTimeout(this.debounceTime);
    this.debounceTime =  setTimeout(() => {
      this.form?.enable();
   }, 500);
   this.loginEvent.emit(this.generateParams());
  }
  

  generateParams(): LoginDto {
    let  params =  new LoginDto(this.username?.value, this.password?.value);
    return params;
  }


  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

}
