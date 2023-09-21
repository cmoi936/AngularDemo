import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { IProduct } from './product';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Fiche produit';
  product: IProduct | undefined;
  sub: Subscription | undefined;
  errorMessage: any;

  constructor(private route: ActivatedRoute, private service: ProductService, private router: Router){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.sub = this.service.getProduct(id).subscribe({
      next: product => {
        this.product = product;
      },
      error: err => this.errorMessage = err
    });
  }

  onBack():void {
    this.router.navigate(['/products']);
  }
}
