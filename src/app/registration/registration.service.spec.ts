import { inject, TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('RegistrationService', () => {
  let service: RegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(RegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRegistrationForm fields from /registrationFields', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const service = TestBed.inject(RegistrationService);
      service.getRegistrationFormFields().subscribe();

      const req = httpMock.expectOne('/registrationFields');
      expect(req.request.method).toEqual('GET');
      httpMock.verify();
    }
  ));
});
