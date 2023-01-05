import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RegistrationField } from '../shared/registration-field.model';
import { RegistrationRequest } from '../shared/registration-request.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}
  getRegistrationFormFields(): Observable<RegistrationField[]> {
    return this.httpClient.get<RegistrationField[]>('/registrationFields');
  }
  register(requestBody: RegistrationRequest): Observable<any> {
    return this.httpClient.post('/register', requestBody);
  }
}
