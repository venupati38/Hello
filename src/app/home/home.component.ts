import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  @ViewChild('h') h!:ElementRef;
  // @ContentChild('div1') dv!:ElementRef;
  @ContentChildren('div1') dv!: QueryList<ElementRef>;
  
  @Input() count:number=0;
  constructor() {
    console.log('HomeComponent:constructor');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('HomeComponent:ngOnChanges');
  }
  ngOnInit(): void {
    console.log('HomeComponent:ngOnInit');
  }
  ngDoCheck(): void {
    console.log('HomeComponent:ngDoCheck');
  }
  ngAfterContentInit(): void {
    console.log('HomeComponent:ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('HomeComponent:ngAfterContentChecked value-'+this.count);
  }
  ngAfterViewInit(): void {
    console.log('HomeComponent:ngAfterViewInit');
  }
  ngAfterViewChecked(): void {
    this.dv.map((x,i)=>{
      console.log('HomeComponent:ngAfterViewChecked value-'+i+x.nativeElement.innerText);
      x.nativeElement.innerText="VENU-"
    })
    // for (let index = 0; index < this.dv.; index++) {
    //   const element = this.dv.nativeElement;
    //   console.log('HomeComponent:ngAfterViewChecked value-'+element);
    // }
    //console.log('HomeComponent:ngAfterViewChecked value-'+this.dv);
  }
}
