import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { Utils } from '../utils/utils';

// Diretiva utilizada para validar se os campos estão correspondendo ou não
@Directive({
  selector: '[appMatchPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true }]
})
export class MatchPasswordDirective implements Validator {
  @Input('appMatchPassword') matchPassword: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Utils.match(this.matchPassword[0], this.matchPassword[1])(formGroup);
  }
}