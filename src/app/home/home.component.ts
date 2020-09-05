import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { apis } from '../services/config';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private commonService : CommonService,
    private authService : AuthenticateService
  ) { }

  ngOnInit(): void {
    
  }

  onLogout(){
    debugger
    this.authService.logout()
    location.reload(true)
  }

}
