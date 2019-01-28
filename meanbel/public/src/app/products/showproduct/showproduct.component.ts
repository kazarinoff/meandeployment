import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit {
product={name:'',quantity:'',price:'',specialid:''}
displayerrors=[];

  constructor(private service:InfoService, private _route:ActivatedRoute, private _router:Router) { }

  ngOnInit() {
    this._route.params.subscribe((params:Params)=>{
      this.service.showProduct(params.id).subscribe((data:any)=>{
        this.product=data.output;
      })
    })
  }
  deleteproduct(){
    this.service.deleteProduct(this.product.specialid).subscribe((data:any)=>{
      console.log("product deleted",data);
      if (data.errors){
        console.log(data.errors,"validation errors");
        this.displayerrors.push(data.errors.message);
      }
      else {
        this._router.navigate([''])
      };
    });
  };
}
