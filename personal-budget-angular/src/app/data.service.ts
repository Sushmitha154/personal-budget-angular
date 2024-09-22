import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataFromDataApi: any[] = [];  // To store data from /data API
  private dataFromExampleApi: any[] = [];  // To store data from /example API

  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private exampleSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  // Fetch data from /data API if not already fetched
  fetchDataIfNeeded(): void {
    if (this.dataFromDataApi.length === 0) {
      this.http.get('http://localhost:3000/budget').subscribe((response: any) => {
        this.dataFromDataApi = response;  // Store the fetched data
        this.dataSubject.next(this.dataFromDataApi);  // Update the BehaviorSubject
      });
    }
  }

  // Fetch data from /example API if not already fetched
  fetchExampleDataIfNeeded(): void {
    if (this.dataFromExampleApi.length === 0) {
      this.http.get('http://localhost:3000/example').subscribe((response: any) => {
        this.dataFromExampleApi = response;  // Store the fetched data
        this.exampleSubject.next(this.dataFromExampleApi);  // Update the BehaviorSubject
      });
    }
  }

  // Return the data from /data API as an Observable
  getData(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  // Return the data from /example API as an Observable
  getExampleData(): Observable<any[]> {
    return this.exampleSubject.asObservable();
  }
}
