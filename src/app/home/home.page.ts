import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router, public authService: AuthService) {}

  async logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/landing']);
    }).catch((error) => {
      console.log(error);
    });
  }

}
