import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, HostBinding, inject, Injector, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { DomPortalOutlet, PortalOutlet, TemplatePortal } from '@angular/cdk/portal'; // Import the DomPortalOutlet class
import { ERROR_FORMS } from '../constant/error-form';
import { ValidationErrorMsgComponent } from './validation-error-msg.component';

@Directive({
  selector: '[formValidator]',
})
export class FormValidatorDirective implements OnInit, OnChanges {

  
  @HostBinding('style.position') position = 'relative';
  @Input() inputErrors: any;
  @Input() errorDefs: any;
  @Input() touched?: boolean;
  errorDefsGenerics = typeof  ERROR_FORMS as any;
  errorMessage?: string;
  isControlTouched?: any ;
  errorsControl: any ;
  private errorMsgPortalHost?: PortalOutlet;
  private templatePortal?: TemplatePortal;
  
  constructor(
    private elementRef: ElementRef,
    private injector: Injector,
    private appRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.errorDefsGenerics = ERROR_FORMS ;
  }

  ngOnInit(): void {
    this.templatePortal = this.CreateTemplatePortal();
    this.createContainerTemplate();
    this.viewContainerRef.createComponent(ValidationErrorMsgComponent)
  }

  get errorsMsg() {
    return this.errorMessage;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.hide();
    this.setChange(changes);
    this.verifyErrors(this.errorsControl);
  }

  private setChange(changes: SimpleChanges) {
    if (changes['inputErrors']) { this.errorsControl = changes['inputErrors'].currentValue; }
    if (changes['touched']) { this.isControlTouched = changes['touched'].currentValue; }
  }

  private verifyErrors(errors: any) {
    if (this.errorsControl && this.touched) {
      // Vallidamos los configurados
      if (!this.verificarErrores(errors)) {
        this.verificarErroresGenericos(errors);
      }
    }
  }

  private verificarErrores(errors: any): boolean {
    if (this.errorDefs) {
      return Object.keys(this.errorDefs).some(key => {
        if (errors[key]) {
          this.errorMessage = this.errorDefs[key];
          this.show();
          return true;
        }
        return false;
      });
    } else {
      return false;
    }
  }

  private verificarErroresGenericos(errors:any): boolean {
    console.log(errors);
    return Object.keys(this.errorDefsGenerics).some(key => {
      if (errors[key]) {
        this.errorMessage = this.errorDefsGenerics[key];
        this.show();
        return true;
      }
      return false;
    });
  }

  private createContainerTemplate() {
    this.errorMsgPortalHost = new DomPortalOutlet(
      (this.elementRef.nativeElement).parentElement,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
    this.templatePortal = this.CreateTemplatePortal();

    
  }

  private CreateTemplatePortal() {
    const errorMsgComponent = this.componentFactoryResolver.resolveComponentFactory(ValidationErrorMsgComponent);
    const errorMsgComponentRef = errorMsgComponent.create(this.injector);
    return new TemplatePortal(
      errorMsgComponentRef.instance.errorMsg!,
      this.viewContainerRef,
      {
        $implicit: this.errorsMsg,
      }
    );

  }

  private show() {

    if (this.templatePortal) {
      if (!this.templatePortal.isAttached) {
        this.createContainerTemplate();
        this.errorMsgPortalHost!.attach(this.templatePortal);
      }
    } else {
      setTimeout(() => {
        if (!this.templatePortal!.isAttached) {
          this.createContainerTemplate();
          this.errorMsgPortalHost!.attach(this.templatePortal!);
        }
      }, 200);
    }
  }

  private hide() {
    if (this.templatePortal) {
      if (!this.templatePortal.isAttached) {
        this.errorMsgPortalHost!.detach();
      }else {
        this.errorMsgPortalHost!.detach();
      }
    } else {}
  }


}