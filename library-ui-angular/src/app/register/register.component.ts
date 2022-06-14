import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = new FormGroup({
    name: new FormControl("")
  })

  registerMessage: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  async onRegister(data: any) {
    await this.http.get("http://localhost:5041/api/user?name=" + data.name).subscribe(o => this.registerMessage = "Account number for " + data.name + ": " + o);
  }
}
