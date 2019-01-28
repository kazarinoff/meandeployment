import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  product={name:'',quantity:'',price:'',specialid:0}
  displayerrors=[];

  constructor(private service:InfoService, private _router:Router, private _route:ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe((params:Params)=>{
      this.service.showProduct(params.id).subscribe((data:any)=>{
        this.product=data.output;
      })
    })
  }
  updateProduct(){
    this.displayerrors=[];
    this.service.editProduct(this.product.specialid,this.product).subscribe((data:any)=>{
      console.log('product updated',data);
      if (data.err){
        console.log(data.err.errors,"validation errors");
        for (let i in data.err.errors){
          this.displayerrors.push(data.err.errors[i].message);
        }
      }
      else {
        this._router.navigate([''])};
    });
  }
  resetproduct(){
    this.displayerrors=[];
    this._route.params.subscribe((params:Params)=>{
      this.service.showProduct(params.id).subscribe((data:any)=>{
        this.product=data.output;
      })
    })
  }


}
