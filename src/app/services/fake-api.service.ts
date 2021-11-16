import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  constructor(private store: Store, private http: HttpClient) {
  }

  getItems(): Observable<any> {
    return this.http.get('../../assets/fake-data.json');
  }
}
