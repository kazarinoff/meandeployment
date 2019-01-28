import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {
  newproduct={name:'',quantity:'',price:'',specialid:1}
  displayerrors=[];
  needid=1

  constructor(private service:InfoService, private _router:Router) { }

  ngOnInit() {
    this.service.lastProduct().subscribe((data:any)=>{
      if(data.output.length<1){
        this.newproduct.specialid=this.needid;
      }
      else {
        console.log(data,"where's the id?");
        this.needid=parseInt(data.output[data.output.length-1].specialid)+1
        this.newproduct.specialid=this.needid;
      };
    });
  };

  resetproduct(){
    this.newproduct={name:'',quantity:'',price:'',specialid:this.needid};
  }
  newProduct(){
    this.service.createProduct(this.newproduct).subscribe((data:any)=>{
      console.log('product created');
      if (data.errors){
        console.log(data.errors.errors,"validation errors");
        for (let i in data.errors.errors){
          this.displayerrors.push(data.errors.errors[i].message);
        }
      }
      else {
        this._router.navigate([''])};
    });

  }
}
