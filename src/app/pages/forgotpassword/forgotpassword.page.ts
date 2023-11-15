import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  email: any;
  constructor(public authServices: AuthService, public router: Router) { }

  ngOnInit() {
  }

  async resetPassword() {
    this.authServices.resetPassword(this.email).then(() => {
      console.log('Password reset successful');
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
    })
  }

}
