import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface ISelectorOptions {
    name: string;
    value: string;
}

@Component({
    selector: 'dropdown-selector',
    templateUrl: './dropdown-selector.component.html',
    styleUrls: ['./dropdown-selector.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownSelector),
            multi: true
        }
    ]
})

export class DropdownSelector implements OnInit, OnDestroy, ControlValueAccessor {
    onChange: any = () => { };
    onTouched: any = () => { };

    handleItemClick(item: ISelectorOptions) {
        this.isOpen = false
        this.selected = item.name
        this.value = item.value
        this.onChange(this.value);
        this.error = false
    }
    @ViewChild('container') container!: ElementRef<HTMLElement>;
    isOpen: boolean = false
    selected: string = ""
    value: string = ""

    @Input('options')
    options: ISelectorOptions[] = []
    @Input('error')
    error: boolean = false

    handleClick = (e: MouseEvent) => {
        if (!this.container.nativeElement.contains(e.target as Node)) {
            this.isOpen = false;
        }
    }

    constructor() {

    }
    writeValue(value: string): void {
        this.value = value
    }
    registerOnChange(fn: any): void {
        this.onChange = fn
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }
    setDisabledState?(isDisabled: boolean): void {

    }

    ngOnInit(): void {
        document.addEventListener('click', this.handleClick);

    }
    ngOnDestroy(): void {
        document.removeEventListener('click', this.handleClick);
    }
}
