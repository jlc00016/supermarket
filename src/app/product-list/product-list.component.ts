import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  public title: string;
  public products: Product[];
  public productIdToDelete: string;

  constructor(
    private productService: ProductService
  ) {
    this.title = 'Product list';
    this.productIdToDelete = null;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      result => {
        this.products = result;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  setProductIdToDelete(id) {
    this.productIdToDelete = id;
  }

  onDeleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(
      response => {
        this.getProducts();
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
