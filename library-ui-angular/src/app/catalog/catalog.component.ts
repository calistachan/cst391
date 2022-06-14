import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(private http: HttpClient) { }

  loading = true;
  detailLoading = false;
  books: any = null;
  selectedBook: any = null;
  checkOutError: string = "";
  returnError: string = "";

  checkOutForm = new FormGroup({ 
    account: new FormControl(''),
  });

  returnForm = new FormGroup({ 
    account: new FormControl(''),
  });


  async ngOnInit() {
    await this.http.get("http://localhost:5041/api/book/all").subscribe(o => {
      this.books = o;
      this.loading = false;
    });
  }

  onBookListingClick(clickedBook: any): void {
    console.log(clickedBook?.title)
    this.selectedBook = clickedBook;
  }

  backToCatalog(): void {
    this.selectedBook = null;
  }

  async onCheckOut(data: any, book: any) {
    this.selectedBook.checkedOut = true;
    this.selectedBook.checkedOutBy = data.account;
    var body = {
      "bookId": book.bookId,
      "accountNumber": parseInt(data.account)
    }
    this.detailLoading = true;
    await this.http.post("http://localhost:5041/api/book/checkout", body).subscribe(o => {console.log(o); this.detailLoading = false;});
    this.returnForm.controls["account"].setValue("");
    this.checkOutForm.controls["account"].setValue("");
  }

  async onReturn(data: any, book: any) {
    if(book.checkedOutBy != data.account) {
      this.returnError = "Account entered was not the account that checked out the book."
      return;
    }
    this.selectedBook.checkedOut = false;
    this.selectedBook.checkedOutBy = -1;
    var body = {
      "bookId": book.bookId,
      "accountNumber": parseInt(data.account)
    }
    this.detailLoading = true;
    await this.http.post("http://localhost:5041/api/book/return", body).subscribe(o => {console.log(o); this.detailLoading = false;});
    this.returnForm.controls["account"].setValue("");
    this.checkOutForm.controls["account"].setValue("");
    this.returnError = "";
  }
}
