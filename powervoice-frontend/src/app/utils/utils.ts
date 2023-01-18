import { FormGroup } from "@angular/forms";

export class Utils {
    static compareById(a: any, b: any): boolean {
        return a && b && a.id === b.id;
    }

    // Validação de campos iguais (password/email)
    static match(controlName: string, checkControlName: string) {
        return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const checkControl = formGroup.controls[checkControlName];
    
        //   Se retornar, significa que a validação passou
          if (checkControl?.errors && !checkControl.errors['matching']) {
            return null;
          }
          
        //   Verifica se os campos correspondem (são iguais) ou não. Se falhar,
        // define erro na verificação de controle (matching=true)
          if (control?.value !== checkControl?.value) {
            checkControl?.setErrors({ matching: true });
            return { matching: true };
          } else {
            checkControl?.setErrors(null);
            return null;
          }
        };
      }
}
