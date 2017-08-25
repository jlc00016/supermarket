import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './../product-add/product-add.component.html',
  styleUrls: ['./../product-add/product-add.component.css'],
  providers: [ProductService]
})
export class ProductEditComponent implements OnInit {

  public title: string;
  public product: Product;
  public fileToUpload: File;
  public resultUpload;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.title = 'Edit Product';
    this.product = new Product('', '', '', 0, '');
  }

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

  onSubmit() {
    console.log(this.product);

    if (this.fileToUpload) {
      this.productService.makeFileRequest([], this.fileToUpload).then(
        result => {
          console.log(result);

          this.resultUpload = result;
          this.product.image = this.resultUpload;
          this.updateProduct();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.productService.editProduct(this.product.id, this.product).subscribe(
      response => {
        this.router.navigate(['/product/' + this.product.id]);
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
