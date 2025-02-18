import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-auth-dump',
  imports: [RouterOutlet,ValidatioErrorForms, FormsModule, ReactiveFormsModule,MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatIconModule, MatListModule,MatGridListModule, MatBadgeModule,MatSidenavModule],
  templateUrl: './auth-dump.component.html',
  styleUrl: './auth-dump.component.scss'
})
export class AuthDumpComponent {

  
  private formBuilder: FormBuilder = new FormBuilder();
  form: FormGroup = new FormGroup({});    
  erroresDefs?: typeof ERROR_FORMS =  ERROR_FORMS;
  constructor() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      captcha: [null]
    })
  }

}
