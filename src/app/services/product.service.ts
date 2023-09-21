import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IProduct } from "../products/product";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ProductService{
    private baseUrl = "https://908e2d23-c8c2-4834-91df-31ac4fe4f004.mock.pstmn.io";

    constructor(private httpClient: HttpClient){
    }

    getProduct(id: number):Observable<IProduct>{
        return this.httpClient
            .get<IProduct>(`${this.baseUrl}/products/${id}`)
            .pipe(
                tap(data => console.log('All', JSON.stringify(data))),
                catchError(this.handError));
    }

    getProducts():Observable<IProduct[]>{
        return this.httpClient
            .get<IProduct[]>(`${this.baseUrl}/products`)
            .pipe(
                tap(data => console.log('All', JSON.stringify(data))),
                catchError(this.handError));
    }

    handError(error: HttpErrorResponse) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent)
        {
            errorMessage = `Une erreur est survenue: ${error.error.message}`;
        }
        else {
            errorMessage = `Le serveur a retourné le code: ${error.status}, avec le message: ${error.message}`;
        }

        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}