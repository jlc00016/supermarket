import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public title: string;

  constructor() {
    this.title = 'Listado de productos';
  }

  ngOnInit() {
  }

}
