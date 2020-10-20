
//Directive for dropdown toggling when the toggle is clicked. We are addding functionality to it that allows us to add a 
//certain css class to the element it sits on,so that once the element is clicked the class can be added and removed when the element is clicked again

import { Directive, HostBinding, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdowndirective]' //selector is put is brackets so that it can be bindable to attributes 
})
export class DropdowndirectiveDirective implements OnInit{

  

  @HostBinding('class.open') isOpen=false;  //HostBinding take the css open class depending on whether the property isOpen is false or true. isOpen will be a boolean that checks if the toggle is open or not
  
    constructor(private elRef:ElementRef) {
      this.isOpen=false;
    }
  ngOnInit(){
    
  }
  //HostListener('click') is for listerning to click event.

  //  @HostListener('click') toggleOpen(event:Event){
  //    this.isOpen=!this.isOpen;  
  //  }


  //this will enable the dropdown to be be opened depending on the value of isOpen and will be closed by a click anywhere outside 
 @HostListener('document:click', ['$event']) toggleOpen(event: Event){
   this.isOpen=this.elRef.nativeElement.contains(event.target) ? !this.isOpen:false ;
 }

}
