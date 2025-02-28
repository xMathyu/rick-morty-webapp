import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Character,
  ApiResponse,
  Info,
  CharacterFilter,
} from '../models/rick-and-morty.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl =
    'https://rick-morty-backend-747449133192.us-east1.run.app/characters';

  constructor(private http: HttpClient) {}

  getCharacters(filter: CharacterFilter = {}): Observable<Character[]> {
    let params = new HttpParams();
    Object.keys(filter).forEach((key) => {
      const typedKey = key as keyof CharacterFilter;
      const value = filter[typedKey];
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, `${value}`);
      }
    });
    return this.http.get<Character[]>(this.apiUrl, { params });
  }

  getExternalCharacters(
    filter: CharacterFilter = {}
  ): Observable<Info<Character[]>> {
    let params = new HttpParams();
    Object.keys(filter).forEach((key) => {
      const typedKey = key as keyof CharacterFilter;
      const value = filter[typedKey];
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, `${value}`);
      }
    });
    return this.http.get<Info<Character[]>>(`${this.apiUrl}/external`, {
      params,
    });
  }

  getCharacterById(id: string): Observable<ApiResponse<Character>> {
    return this.http.get<ApiResponse<Character>>(`${this.apiUrl}/${id}`);
  }

  createCharacter(
    character: Partial<Character>
  ): Observable<ApiResponse<Character>> {
    return this.http.post<ApiResponse<Character>>(this.apiUrl, character);
  }

  updateCharacter(
    id: string,
    character: Partial<Character>
  ): Observable<ApiResponse<Character>> {
    return this.http.patch<ApiResponse<Character>>(
      `${this.apiUrl}/${id}`,
      character
    );
  }

  deleteCharacter(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }

  getLocations(): Observable<Info<Location[]>> {
    return this.http.get<Info<Location[]>>(`${this.apiUrl}/locations`);
  }
}
