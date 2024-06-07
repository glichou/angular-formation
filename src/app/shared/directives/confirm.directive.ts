import { Directive, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Directive({
    selector: '[confirm]',
    standalone: true
})
export class ConfirmDirective {
    @Input('confirm') message = ''
    @Input() confirmUsername = ''
    @Output() applyConfirm: EventEmitter<void> = new EventEmitter()

    @HostListener('click')
    openDialog() {
        const bool = window.confirm(this.message + ' ' + this.confirmUsername)
        if (bool) this.applyConfirm.emit()
    }
}