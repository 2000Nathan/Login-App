import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  regForm!: FormGroup;
  constructor( private auth : AuthService,public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authServices: AuthService, public router: Router) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$")]],
    });
  }
  

  get errorControl() {
    return this.regForm?.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (!this.regForm?.valid) {
      let user;
      try {
        await this.authServices.registerUser(this.regForm.value.email, this.regForm.value.password);
        loading.dismiss();
        this.router.navigate(['/login']);
      } catch (error) {
        console.log(error);
        loading.dismiss();
        console.log('provide valid email and password');
      }
    }
  }

  // signInWithGoogle() 
  signInWithGoogle() {
    this.auth.googleSignIn();
  }


}
