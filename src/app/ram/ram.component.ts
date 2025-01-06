import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { RamModel } from '../_models/ram-model';

@Component({
  selector: 'app-ram',
  standalone: true,
  imports: [],
  templateUrl: './ram.component.html',
  styleUrl: './ram.component.css'
})
export class RamComponent {
  @Input() ram: RamModel | undefined = undefined;
  @Output() canceld = new EventEmitter<void>();
  @Output() saved = new EventEmitter<RamModel>();
  isVisible: boolean = true;

  getvalue(event: any): string {
    return event.target.value;
  }
  cancel(){
    this.canceld.emit();
  }
  getNumberValue(event: any): number{
    return Number(event.target.value)
  }
  save(){
    this.saved.emit(this.ram);
  }
  getBooleanValue(event: any): boolean{
    return event.target.checked;
  }

}
