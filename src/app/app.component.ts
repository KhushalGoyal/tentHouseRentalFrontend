import { Component, ChangeDetectorRef } from '@angular/core';
import { User } from './models/user';
import { Router } from '@angular/router';
import { AuthenticateService } from './services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tentHouseRentalFrontend';
  currentUser: User;
  hideNav: Boolean = false 
    constructor(
        private router: Router,
        private authenticationService: AuthenticateService,
        private ref: ChangeDetectorRef
    ) {
        // if(this.router.url === '/'){
        //   console.log("Hello")
        //   this.hideNav = true;
        //   this.ref.markForCheck();
        // }
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
