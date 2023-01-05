import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { registrationFormFields } from '../assets/fields-fake-response';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/registrationFields') && method === 'GET':
          return getRegistrationFields();
        case url.endsWith('/register') && method === 'POST':
          return register();
        default:
          return next.handle(request);
      }
    }
    function getRegistrationFields() {
      return of(
        new HttpResponse({
          status: 200,
          body: registrationFormFields,
        })
      ).pipe(delay(500));
    }
    function register() {
      return of(
        new HttpResponse({
          status: 200,
          body,
        })
      ).pipe(delay(500));
    }
  }
}
