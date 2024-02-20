import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  title = 'Hello';
  count: number = 0;
  // @ViewChild(HomeComponent) component!:HomeComponent;
  // @ViewChild('div1') component1!:HomeComponent;

  hellman() {
    console.log('clicked');
    this.count = this.count + 1;
  }

  constructor() {
    console.log('AppComponent:constructor');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('AppComponent:ngOnChanges');
  }
  ngOnInit(): void {
    console.log('AppComponent:ngOnInit');
  }
  ngDoCheck(): void {
    console.log('AppComponent:ngDoCheck');
  }
  ngAfterContentInit(): void {
    console.log('AppComponent:ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    //console.log('AppComponent:ngAfterContentChecked'+this.component?.count);
    console.log('AppComponent:ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('AppComponent:ngAfterViewInit');
  }
  ngAfterViewChecked(): void {
    console.log('AppComponent:ngAfterViewChecked');
    //console.log('AppComponent:ngAfterViewChecked'+this.component?.count);
    // console.log('Hell-'+this.component.h.nativeElement.innerText);
    // console.log('Hell Mine-'+this.component1);
  }
}
