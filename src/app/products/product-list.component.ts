import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "../services/product.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Liste des produits';
  errorMessage: string = '';
  sub: Subscription | undefined;
  showImages: boolean = false;
  imageWidth = 60;
  imageMargin = 2;

  private _productsInDb: IProduct[] = [];

  private _products: IProduct[] = [];
  get products(): IProduct[]{
    return this._products
  }
  set products(value: IProduct[]){
    this._products = value;
  }

  private _filter: string = '';
  get filter():string {
    return this._filter;
  }
  set filter(value: string){
    this._filter = value;
    console.log("Filtre possède la valeur", value);
    this.products = this.performFilter(value);
  }

  constructor(private service: ProductService ){
  }

  toggleImages(): void {
    this.showImages = !this.showImages;
  }

  ngOnInit(): void {
    this.sub = this.service.getProducts().subscribe({
      next: products => {
        this._productsInDb = products;
        this.products = this._productsInDb;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void{
    this.sub?.unsubscribe();
  }

  performFilter(filterValue: string): IProduct[] {
    if(this.filter == '')
      return this._productsInDb;
    return this._productsInDb.filter((product: IProduct) =>
      product.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()));
  }

  onRatingClick(message: string):void{
    console.log(message);
  }
}