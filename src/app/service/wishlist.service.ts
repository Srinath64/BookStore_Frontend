import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  removeFromCart(wishlist_id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  addToWishList(wishlist:Object): Observable<Object>{
    return this.http.post(`http://localhost:8080/wishlist/add`, wishlist)
  }

  getAllWishListBookId(token: String): Observable<any>{
    return this.http.get(`http://localhost:8080/wishlist/get/${token}`)
  }

  removeFromWishList(wishlist_id: number): Observable<any> {
    console.log("rem")
    return this.http.delete(`http://localhost:8080/wishlist/remove/${wishlist_id}`);
  }

}
