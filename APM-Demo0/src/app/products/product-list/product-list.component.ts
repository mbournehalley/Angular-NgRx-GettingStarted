import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  displayCode: boolean;
  errorMessage: string;
  pageTitle = 'Products';
  products: Product[];
  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private store: Store<any>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => (this.selectedProduct = selectedProduct)
    );

    this.productService
      .getProducts()
      .subscribe(
        (products: Product[]) => (this.products = products),
        (err: any) => (this.errorMessage = err.error)
      );

    this.store.pipe(select('products')).subscribe(products => {
      if (products) {
        this.displayCode = products.showProductCode;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value,
    });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }
}
