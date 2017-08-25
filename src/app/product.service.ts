import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Product } from './product';

@Injectable()
export class ProductService {

  private url: string;

  constructor(
    private http: Http
  ) {
    this.url = 'http://supermarket-api.local/app_dev.php/api/';
  }

  getProducts() {
    return this.http.get(this.url + 'products').map(res => res.json());
  }

  getProduct(id) {
    return this.http.get(this.url + 'product/' + id).map(res => res.json());
  }

  addProduct(product: Product) {
    let json = JSON.stringify(product);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.url + 'product', json, options)
      .map(res => res.json());
  }

  editProduct(id: string, product: Product) {
    let json = JSON.stringify(product);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.put(this.url + 'product/' + id, json, options)
      .map(res => res.json());
  }

  deleteProduct(id: string) {
    return this.http.delete(this.url + 'product/' + id).map(res => res.json());
  }

  makeFileRequest(params: Array<string>, file: File) {
    return new Promise((resolve, reject) => {
      let formData: FormData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('image', file, file.name);

      xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', this.url + 'product/upload-image', true),
      xhr.send(formData);
    });
  }
}
