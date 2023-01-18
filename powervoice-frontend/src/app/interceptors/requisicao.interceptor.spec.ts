import { TestBed } from '@angular/core/testing';

import { RequisicaoInterceptor } from './requisicao.interceptor';

describe('RequisicaoInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequisicaoInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequisicaoInterceptor = TestBed.inject(RequisicaoInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
