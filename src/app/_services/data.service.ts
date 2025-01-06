import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RamModel } from '../_models/ram-model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:3000/rams';

  constructor(private http: HttpClient) { }

  getRams(): Observable<RamModel[]> {
    return this.http.get<RamModel[]>(this.url);
  }

  getRamById(id: string): Observable<RamModel> {
    return this.http.get<RamModel>(`${this.url}/${id}`);
  }

  addRam(ram: RamModel): Observable<RamModel> {
    return this.http.post<RamModel>(this.url, ram);
  }

  deleteRam(id: string): Observable<RamModel> {
    return this.http.delete<RamModel>(`${this.url}/${id}`);
  }

  updateRam(ram: RamModel): Observable<RamModel> {
    return this.http.put<RamModel>(`${this.url}/${ram.id}`, ram);
  }
}





