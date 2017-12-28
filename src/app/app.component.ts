import { Component } from '@angular/core';
import { TokenManager } from '../app/Model/TokenManager';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Api Demo';
  oTokenManager: TokenManager;
  TokenData: TokenManager = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.oTokenManager = new TokenManager();
    this.TokenData = this.oTokenManager.GetToken();
    //console
    if (this.TokenData == null) {
      this.router.navigateByUrl('LogIn');
    }
  }
}
