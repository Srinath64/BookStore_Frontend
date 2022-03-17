import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

/**
 * Get all books from the database
 * @returns An Observable of type Book[]
 */
  getAllbooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`http://localhost:8080/book`);
  }

/**
 * Given a book id, return the book with that id
 * @param {number} book_id - The id of the book we want to get.
 * @returns An Observable of type Book[]
 */
  getBookById(book_id: number): Observable<any>{
    return this.http.get<Book[]>(`http://localhost:8080/book/${book_id}`);
  }

/**
 * Get all books with a given name
 * @param {String} book_name - The name of the book to be searched.
 * @returns An Observable of type Book[]
 */
  getBookByName(book_name: String): Observable<any>{
    return this.http.get<Book[]>(`http://localhost:8080/book/bookname/${book_name}`);
  }

/**
 * It sorts the books by the number of pages.
 * @param {number} num - number
 * @returns An Observable of type Book[]
 */
  sort(num: number): Observable<any>{
    return this.http.get<Book[]>(`http://localhost:8080/book/sort/${num}`);
  }

/**
 * It changes the quantity of a book in the database.
 * @param {number} book_id - The id of the book to change the quantity of.
 * @param {number} quantity - The new quantity of the book.
 * @returns An Observable of type any.
 */
  changeBookQuantity(book_id:number, quantity:number): Observable<any>{
    const token = localStorage.getItem("token") 
    const params = new HttpParams()
                .set('book_id', book_id)
                .set('quantity', quantity);
    return this.http.post(`http://localhost:8080/book/changequantity/${token}`, params);
  }


}
