import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BookService } from 'src/app/service/book.service';
import { WishlistService } from 'src/app/service/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  formGroup !: FormGroup;
  type= ""
  totalPrice = 0;
  ListofBooks:number[] = []
  orderId = 0;
  bookQuantity = 1;
  wishlists: any;

  constructor(private bookService: BookService,
              private wishlistService: WishlistService,
              private snackBar: MatSnackBar) { }

  token = localStorage.getItem("token") || "";

  ngOnInit(): void {
    this.onReload();
    this.getListofBooks();
  }
  onReload() {
    this.wishlistService.getAllWishListBookId(this.token).subscribe(data => {this.wishlists = data})
  }

  getListofBooks(){
    this.wishlistService.getAllWishListBookId(localStorage.getItem("token") || "").subscribe(data => {
      this.ListofBooks = data;
    })
  }

  onRemove(wishlist_id: number){
    this.wishlistService.removeFromWishList(wishlist_id).subscribe(data => this.onReload());
    this.snackBar.open('Book Removed from WishList!', 'Dismiss', {
      duration: 4000,
      verticalPosition: 'top'
    });
  }

}
