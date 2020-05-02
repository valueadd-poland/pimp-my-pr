import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MockHttpService {
  get = this.request;
  post = this.request;

  request(url: string): Observable<AxiosResponse> {
    const file = this.mapUrlToMockFilePath(url);
    return from(import(file).then(mock => mock.response)).pipe(
      map(data => ({ data, status: 200 } as any))
    );
  }

  private mapUrlToMockFilePath(url: string): string {
    const fileName = url
      .replace(/^(https?:|)\/\//, '')
      .split('/')
      .join('-');
    return `../fixtures/responses/${fileName}.ts`;
  }
}
