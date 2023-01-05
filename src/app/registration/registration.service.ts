import { Injectable } from '@angular/core';
import { RegistrationField, RegistrationRequest } from './registration.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
//TODO: -simulate real requests after mocking backend service, implement HTTPClient
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}
  registrationRequestExample: RegistrationRequest = {
    first_name: 'John',
    middle_name: '',
    last_name: 'Doe',
    email: 'john@test.com',
    phone_number: '12345678',
    password: 'SecretPassword',
  };

  getRegistrationFormFields(): Observable<RegistrationField[]> {
    return this.httpClient.get<RegistrationField[]>('/registrationFields');
  }
  register(requestBody: RegistrationRequest): Observable<any> {
    return this.httpClient.post('/register', requestBody);
  }
}
