import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  private readonly apiUrl= "https://localhost:44334/api";
  private httpOptions = { headers: new HttpHeaders({ "Content-type": "application/json" }) };

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/categories/listAll")
    .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/recipes/listAll")
    .pipe(catchError(this.errorHandler));
  }

  search(id : number): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/recipes/searchById/" + id)
    .pipe(catchError(this.errorHandler));
  }

  searchByName(title:string): Observable<any>{
    return this.httpClient.get(this.apiUrl + "/recipes/searchByName/" + title)
    .pipe(catchError(this.errorHandler));
  }

  searchByCategory(name: string) : Observable<any> {
    return this.httpClient.get(this.apiUrl + "/recipes/searchByCategory/" + name)
      .pipe(catchError(this.errorHandler));
  }

  searchByIngredient(name: string): Observable<any>{
    return this.httpClient.get(this.apiUrl + "/recipes/searchByIngredient/" + name).
    pipe(catchError(this.errorHandler));
  }

  create(recipes: Recipe){
    return this.httpClient.post(this.apiUrl + "/recipes/create", JSON.stringify(recipes), this.httpOptions).
    pipe(catchError(this.errorHandler));
  }

  update(id: number, recipes : Recipe){
    return this.httpClient.put(this.apiUrl + "/recipes/update/" + id, JSON.stringify(recipes), this.httpOptions).
    pipe(catchError(this.errorHandler));
  }

  delete(id: number){
    return this.httpClient.delete(this.apiUrl + "/Recipes/Delete/" + id, this.httpOptions).
    pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = "";

    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = "Error code: " + error.status + "\nMessage: " + error.message;
    }

    return throwError(() => error);
  }
}

