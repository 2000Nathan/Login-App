import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  

  constructor(private auth : AuthService, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authServices: AuthService, public router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$")]],
    });
  }

  get errorControl() {
    return this.loginForm?.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (!this.loginForm?.valid) {
      let user;
      try {
        await this.authServices.loginUser(this.loginForm.value.email, this.loginForm.value.password);
        loading.dismiss();
        this.router.navigate(['/home']);
      } catch (error) {
        console.log(error);
        loading.dismiss();
        console.log('provide valid email and password');
      }
    }
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

  signInWithFacebook() {
    this.auth.facebookSignIn();
  }

}
