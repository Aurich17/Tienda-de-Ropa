import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  export(evt: MouseEvent, option:string){
    
    event.preventDefault();

  }
}
