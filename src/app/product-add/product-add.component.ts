import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [ProductService]
})
export class ProductAddComponent implements OnInit {

  public title: string;
  public product: Product;
  public fileToUpload: File;
  public resultUpload;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    this.title = 'Create a new product';
    this.product = new Product('', '', '', 0, '');
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.product);

    if (this.fileToUpload) {
      this.productService.makeFileRequest([], this.fileToUpload).then(
        result => {
          console.log(result);

          this.resultUpload = result;
          this.product.image = this.resultUpload;
          this.saveProduct();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.saveProduct();
    }
  }

  saveProduct() {
    this.productService.addProduct(this.product).subscribe(
      response => {
        this.router.navigate(['/products']);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <File>fileInput.target.files[0];
    console.log(this.fileToUpload);
  }
}
