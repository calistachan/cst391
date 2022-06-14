import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private http: HttpClient) { }
  buttonText = "Go to Delete"
  resultMessage: string = "";
  createActive: boolean = true;
  deleteActive: boolean = false;

  bookForm = new FormGroup({
    isbnThirteen: new FormControl(),
    title: new FormControl(),
    author: new FormControl(),
    imgUrl: new FormControl(),
  }); 

  deleteForm = new FormGroup({
    id: new FormControl()
  }); 
  
  ngOnInit(): void {
  }

  async onCreate(data: any) {
    var body = {
      "isbnThirteen": data.isbnThirteen,
      "title": data.title,
      "author": data.author,
      "imgUrl": data.imgUrl
    }
    await this.http.post("http://localhost:5041/api/book/", body).subscribe(o => {console.log(o);});
    
  }

  async onDelete(data: any) {
    var body = {
      "bookId": data.id
    }
    await this.http.delete("http://localhost:5041/api/book/"+data.id).subscribe(o => {console.log(o);});
    
  }

  swapMode() {
    this.createActive = !this.createActive;
    this.deleteActive = !this.deleteActive;

    this.buttonText = this.createActive ? "Go to Delete" : "Go to Create";
  }
}
