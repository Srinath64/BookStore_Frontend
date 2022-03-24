import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/book';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';
import { WishlistService } from 'src/app/service/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books!: Book[];
  bookIdLIst: number[] = []
  ListofBooks: number[] = []
  sold = "OUT OF STOCK"
  bookName:any

  constructor(private bookService: BookService,
              private cartService: CartService,
              private router: Router,
              private route: ActivatedRoute,
              private wishlistService: WishlistService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.bookName =  this.route.snapshot.paramMap.get('name') || null
    if(this.bookName != null){
      this.bookService.getBookByName(this.bookName).subscribe(data =>{
        this.books = data
        this.ngOnInit()
      })
    }else{
      this.getBookIdLIst()
      this.getListofBooks()
      // this.backToLOginPage();
      this.reloadData();
    }
   

  }

/**
 * It gets all the books from the database and stores them in the books array.
 */
  reloadData(){
    this.bookService.getAllbooks().subscribe((data:Book[]) =>{
      this.books = data;
    })
  }
 
/**
 * This function is used to get all the book id's from the cart
 */
  getBookIdLIst(){
    this.cartService.getAllCartBookId(localStorage.getItem("token") || "").subscribe((data: number[]) => this.bookIdLIst = data)
  }

/**
 * This function gets all the book ids from the wishlist and stores them in the bookIdList array
 */
  getListofBooks(){
    this.wishlistService.getAllWishListBookId(localStorage.getItem("token") || "").subscribe((data: number[]) => this.ListofBooks = data)
  }

/**
 * It adds a book to the cart.
 * @param {number} book_id - The id of the book that you want to add to the cart.
 */
  addToCart(book_id: number){
    var cartDTO = {"quantity": 1, "user_id": localStorage.getItem("token"), "book_id": book_id}
    this.cartService.addToCart(cartDTO).subscribe() 
    setTimeout(() =>{this.ngOnInit()},300)
    this.snackBar.open('Book Added to Cart!', 'Dismiss', {
      duration: 4000,
      verticalPosition: 'top'
    });
  }

/**
 * It adds a book to the wishlist of the user.
 * @param {number} book_id - The id of the book that you want to add to the wishlist.
 */
  addToWishList(book_id: number){
    var wishlistDTO = {"quantity": 1, "user_id": localStorage.getItem("token"), "book_id": book_id}
    this.wishlistService.addToWishList(wishlistDTO).subscribe()
    setTimeout(() =>{this.ngOnInit()},300)
    this.snackBar.open('Book Added to WishList!', 'Dismiss', {
      duration: 4000,
      verticalPosition: 'top'
    });
  }
  

/**
 * The function backToLOginPage() is used to navigate back to the login page
 */
  backToLOginPage(){
    const token = localStorage.getItem("token");
    // if(token == null){
    //   this.router.navigate(['login']);
      
    // } 
    this.router.navigateByUrl('/login');
  }

/**
 * The Onsort function is a function that takes in a number and then calls the sort function in the
 * bookService. 
 * 
 * The sort function in the bookService then calls the sort function in the bookService and then
 * returns the data to the Onsort function. 
 * 
 * The Onsort function then sets the books property to the data returned from the sort function.
 * @param {number} num - number
 */
  Onsort(num:number){
      this.bookService.sort(num).subscribe(data =>{this.books = data; })
  }
}

