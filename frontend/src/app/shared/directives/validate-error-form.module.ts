import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PortalModule} from '@angular/cdk/portal'; 
import { ValidationErrorMsgComponent } from './validation-error-msg.component';
import { FormValidatorDirective } from './form-validator-directive';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    PortalModule,
    FormValidatorDirective,
    ValidationErrorMsgComponent
  ],
  exports: [
    ValidationErrorMsgComponent,
    FormValidatorDirective
  ]
})
export class ValidatioErrorForms { }