import { Component, Inject } from '@angular/core';
import { ERROR_FORMS } from '../../constant/error-form';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ValidatioErrorForms } from '../../directives/validate-error-form.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SaveUserDto } from '../../../users/models/save-user.dto';

@Component({
  selector: 'app-create-edit-user',
  imports: [
    ReactiveFormsModule,
    ValidatioErrorForms,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  editProductForm: FormBuilder = new FormBuilder();
  form: FormGroup = new FormGroup({});
  erroresDefs?: typeof ERROR_FORMS = ERROR_FORMS;

  constructor(
    private dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los
  ) {
    this.initForm();
  }

  initForm(): void {
    const formControls = {
      id: [this.data?.id || ''],
      name: [this.data?.name || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      passwor: [
        this.data?.password || '',
       ,
      ],
      role: [this.data?.rol || '', Validators.required],
    };

    this.form = this.editProductForm.group(formControls);

    if (this.data != null) {
      this.form.get('id')?.disable();
    }
  }
  saveUser() {
    if (this.form.valid) {
      console.log(this.generateParamsDto());
      this.dialogRef.close(this.generateParamsDto());
    }
  }

  generateParamsDto() {
    let productEdit = new SaveUserDto(
      this.form.value.name,
      this.form.value.email,
      this.form.value.passwor == null ? null : this.form.value.passwor,
      this.form.value.role
    );
    return productEdit;
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
