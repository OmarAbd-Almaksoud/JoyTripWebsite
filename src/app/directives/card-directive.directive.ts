import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardDirective]'
})
export class CardDirectiveDirective {
  
  constructor(private elem:ElementRef) { 
   
    this.elem.nativeElement.style.background='#146C94'
    this.elem.nativeElement.style.color='white'
  }
  // @HostListener('click') function(){
      
  // }
 
}
