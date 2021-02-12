import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class InitService {
  ENVIRONMENT: string = 'local'; //local //prod //cloudtest

  ENVVARS: ENVVARS = { WEBSITE_API: 'https://ccl-website-api.herokuapp.com' };

  constructor(private http: HttpClient) {}

  ENVVAR_API: '';

  getEnvironmentVARS(body) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.post(this.ENVVAR_API, body, { headers: headers });
  }
}

export interface ENVVARS {
  WEBSITE_API?: string;
}
