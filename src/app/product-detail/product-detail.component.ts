import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {

  public product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    return this.route.params.forEach((params: Params) => {
      let id = params['id'];

      this.productService.getProduct(id).subscribe(
        response => {
          this.product = response;
        },
        error => {
          console.log(<any>error);
        }
      );
    });
  }

}
