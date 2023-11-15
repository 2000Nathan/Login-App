import { Injectable } from '@angular/core';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  forgotPassword(email: any) {
    throw new Error('Method not implemented.');
  }

  constructor(public ngFireAuth: AngularFireAuth, private fireauth : AngularFireAuth, private router : Router) { }

  async registerUser(email:string, password:string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  async loginUser(email:string, password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  async resetPassword(email:string){  
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  async signOut(){
    return await this.ngFireAuth.signOut();
  }

  async getProfile(){
    return await this.ngFireAuth.currentUser;
  }

  //sigIn whit google

  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigate(['/home']);
      localStorage.setItem('user', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    })
  }

  //sigIn whit Facebook
  facebookSignIn(){
    return this.fireauth.signInWithPopup(new FacebookAuthProvider).then(res => {
      this.router.navigate(['/home']);
      localStorage.setItem('user', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    })
  }
}
