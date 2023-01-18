import { isPlatformBrowser } from "@angular/common";
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core';

/* Cria um novo token de injeção para injetar o window em um componente. */
export const WINDOW = new InjectionToken('WindowToken');

/* Defina a classe abstrata para obter referência ao objeto global do window. */
export abstract class WindowRef {

  get nativeWindow(): Window | Object {
    throw new Error('Not implemented.');
  }

}

/* Defina a classe que implementa uma classe abstrata e retorna o objeto do window nativo. */
export class BrowserWindowRef extends WindowRef {

  constructor() {
    super();
  }

  override get nativeWindow(): Window | Object {
    return window;
  }

}

/* Cria uma função de fábrica que retorna o objeto window nativo. */
export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: Object): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  return new Object();
}

/* Cria um injectable provider para o token WindowRef que usa a classe BrowserWindowRef. */
export const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef
};

/* Cria um injectable provider que usa a função windowFactory para retornar o objeto de window nativo.*/
export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [ WindowRef, PLATFORM_ID ]
};

/* Cria um array de providers. */
export const WINDOW_PROVIDERS = [
  browserWindowProvider,
  windowProvider
];