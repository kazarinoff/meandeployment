import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { IndexproductsComponent } from './products/indexproducts/indexproducts.component';
import { ShowproductComponent } from './products/showproduct/showproduct.component';
import { NewproductComponent } from './products/newproduct/newproduct.component';
import { EditproductComponent } from './products/editproduct/editproduct.component';
import { InfoService } from './products/info.service';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    IndexproductsComponent,
    ShowproductComponent,
    NewproductComponent,
    EditproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, HttpClientModule
  ],
  providers: [InfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
