import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ticketera_app';

  readonly url =  'https://ticketera-mongodb-api.vercel.app/api/';

  data:any = [];

  constructor(private http:HttpClient) { }

  ngOnInit() {
    //this.getTickets();
    this.getUsers();
  }

  getTickets() {
    this.http.get(this.url+'tickets').subscribe((res:any) => {
      console.log(res.tickets);
      this.data = res.tickets;
    });
  }

  getUsers() {
    this.http.get(this.url+'usuarios').subscribe((res:any) => {
      console.log(res.users);
      this.data = res.users;
    });
  }

}
