import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ERROR_FORMS } from '../../constant/error-form';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ValidatioErrorForms } from '../../directives/validate-error-form.module';
import { EditProductDto } from '../../../store/models/editar-producto.dto';
@Component({
  selector: 'app-edit-product-modal',
  imports: [
    ValidatioErrorForms,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.scss',
})
export class EditProductModalComponent {
  editProductForm: FormBuilder = new FormBuilder();
  form: FormGroup = new FormGroup({});
  erroresDefs?: typeof ERROR_FORMS = ERROR_FORMS;

  constructor(
    private dialogRef: MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los
  ) {
    this.initForm();
  }

  initForm(): void {
    const formControls = {
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      price: [this.data?.price || 0, [Validators.required, Validators.min(1)]],
      stock: [this.data?.stock || 0, [Validators.required, Validators.min(1)]],
      imageBase64: [this.data?.imageBase64 || '', Validators.required],
    };

    if (this.data == null) {
      formControls.imageBase64 = ['', Validators.required];
    }

    this.form = this.editProductForm.group(formControls);
  }

  generateParamsDto() {
    let productEdit = new EditProductDto(
      this.data == null ? null : this.data.id,
      this.form.value.name,
      this.form.value.description,
      this.form.value.price,
      this.form.value.stock,
      this.form.value.imageBase64 == '' ? this.data.imageBase64 : this.form.value.imageBase64,
      this.data == null ? true : false
      
    );
    return productEdit;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.form.patchValue({
          imageBase64: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  editProduct(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.generateParamsDto());
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
