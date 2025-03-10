import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appCardFormat]'
})
export class CardFormatDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event'])
    onInput(event: any): void {
        const value = event.target.value.replace(/\D/g, '');
        let formattedValue = '';

        // NNNN NNNN NNNN NNNN
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }

        this.el.nativeElement.value = formattedValue;
    }
}
