import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-indexproducts',
  templateUrl: './indexproducts.component.html',
  styleUrls: ['./indexproducts.component.css']
})
export class IndexproductsComponent implements OnInit {
products=[];
  constructor(private service:InfoService, private _router:Router, private _route:ActivatedRoute) { }

  ngOnInit() {
    this.service.indexProducts().subscribe((data:any)=>{this.products=data.output});
  }

}
