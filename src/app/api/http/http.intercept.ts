import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/empty'
import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { ApiHttpService } from './http.service'

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: ApiHttpService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('event', event)

    return next.handle(this.setAuthorizationHeader(req)).catch(event => {
      console.log('event', event)
      if (event instanceof HttpErrorResponse) {
        return this.catch401(event)
      }
    })
  }

  // Request Interceptor to append Authorization Header
  private setAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
    console.log('setAuthorizationHeader')

    // Make a clone of the request then append the Authorization Header
    // Other way of writing :
    // return req.clone({headers: req.headers.set('Authorization', this.authService.token )});
    return req.clone({
      setHeaders: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoidGVzdDNAY29jdXMuY29tIiwiaWF0IjoxNTQwNTUyMjE5LCJleHAiOjE1NDA2Mzg2MTl9.acUfSDvR5fC1FYWi8x0eumylTXdbHvMyf_w1fCASJ74',
      },
    })
  }
  // Response Interceptor
  private catch401(error: HttpErrorResponse): Observable<any> {
    // Check if we had 401 response
    if (error.status === 401) {
      // redirect to Login page for example
      return Observable.empty()
    }
    return Observable.throw(error)
  }
}
