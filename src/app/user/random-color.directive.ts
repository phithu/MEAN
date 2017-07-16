import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[ptRandomColor]'
})
export class RandomColorDirective {

    private listColor = ['#E91E63', '#4CAF50',
        '#FF5722', '#795548',
        '#9C27B0', '#673AB7'];

    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = this.ramdomColor()
    }

    ramdomColor(): string {

        let index = Math.round(Math.random() * 5 - 0)
        return this.listColor[index];
    }

}
