import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly BASE_URL = 'http://localhost:8080/api/v1/locations';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL);
  }

  addLocation(location: { name: string; date: string; note: string }): Observable<any> {
    return this.http.post<any>(this.BASE_URL, location);
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  updateLocation(id: number, updatedLocation: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/${id}`, updatedLocation);
  }
}
