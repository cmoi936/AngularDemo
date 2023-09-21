import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{pageTitle}}</a>
    <ul class='nav navbar-pills'>
      <li><a [routerLink]="['welcome']" class="nav-link">Accueil</a></li>
      <li><a [routerLink]="['products']" class="nav-link">Produits</a></li>
    </ul>
  </nav>
  <div class="container">
    <router-outlet></router-outlet>
</div>`
})
export class AppComponent{
  pageTitle: string = 'Acme Production Management'
}