import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  
/**
 * It adds an item to the cart.
 * @param {Object} cart - Object
 * @returns An Observable of type Object. 
 */
  addToCart(cart:Object): Observable<Object>{
    return this.http.post(`http://localhost:8080/cart/add`, cart)
  }

/**
 * This function will get all the carts for a specific user
 * @param {String} token - The token that was returned from the login method.
 * @returns An Observable of type any.
 */
  getAllCarts(token: String): Observable<any>{
    return this.http.get(`http://localhost:8080/cart/get/${token}`)
  }

/**
 * This function is used to get all the book id's in the cart of the user
 * @param {String} token - The token that is generated when the user logs in.
 * @returns An Observable of type any.
 */
  getAllCartBookId(token: String): Observable<any>{
    return this.http.get(`http://localhost:8080/cart/getbooklist/${token}`)
  }

/**
 * It removes the item from the cart.
 * @param {number} cart_id - The id of the cart that you want to remove.
 * @returns An Observable of type any.
 */
  removeFromCart(cart_id: number): Observable<any> {
    console.log("rem")
    return this.http.delete(`http://localhost:8080/cart/remove/${cart_id}`);
  }

/**
 * It removes all the carts from the database.
 * @returns An Observable of type any.
 */
  removeAllCarts(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.delete(`http://localhost:8080/cart/removeall/${token}`);
  }

/**
 * It updates the quantity of a product in the cart.
 * @param {number} cart_id - The id of the cart item to update.
 * @param {number} quantity - The new quantity of the item in the cart.
 * @returns An Observable of type any.
 */
  changeQuantity(cart_id:number, quantity: number): Observable<any>{
    const token = localStorage.getItem("token");
    const params = new HttpParams()
                .set('cart_id', cart_id)
                .set('quantity', quantity);
    return this.http.put(`http://localhost:8080/cart/update/${token}`, params)
  }
}
