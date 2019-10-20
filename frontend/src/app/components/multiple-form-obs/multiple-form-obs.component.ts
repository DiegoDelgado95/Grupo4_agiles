import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiple-form-obs',
  templateUrl: './multiple-form-obs.component.html',
  styleUrls: ['./multiple-form-obs.component.css']
})
export class MultipleFormOBSComponent implements OnInit {

  show:boolean=false;

  constructor(private route:Router) { }

  ngOnInit() {
  }


}
