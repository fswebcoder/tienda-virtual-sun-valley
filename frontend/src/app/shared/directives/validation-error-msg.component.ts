import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  template: `
    <ng-template #errorMsg let-msgText>
      <small class="text-danger">{{ msgText }}</small>
    </ng-template>
  `
})
export class ValidationErrorMsgComponent {

  @ViewChild('errorMsg',{static: true}) errorMsg?: TemplateRef<any>;
}