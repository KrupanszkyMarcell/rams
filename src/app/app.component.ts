import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RamModel} from './_models/ram-model';
import { RamComponent } from './ram/ram.component';
import {DataService} from './_services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  rams: RamModel[] = [];
  new: RamModel | undefined = undefined;
  modify: RamModel | undefined = undefined;
  lastId: number = 0;
  
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.dataService.getRams().subscribe({
      next: (data: RamModel[]) => {
        this.rams = data;
        this.lastId = this.rams.length > 0 ? Math.max(...this.rams.map(ram => parseInt(ram.id || '0'))) : 0;
      },
      error: (error: any) => console.error(error)
    });
  }

  newRam() {
    this.new = {
      id: (this.lastId + 1).toString(),
      brandname: '',
      speed: 0,
      capacity: 0,
      generation: 0,
      latency: 0,
    };
    this.lastId++;
  }

  doModify(ram: RamModel) {
    this.modify = JSON.parse(JSON.stringify(ram));
  }

  save(ram: RamModel) {
    if (this.new != undefined) {
      this.dataService.addRam(ram).subscribe({
        next: (data: RamModel) => {
          this.rams.push(data);
          this.new = undefined;
        },
        error: (error: any) => console.error(error)
      });
    } else {
      this.dataService.updateRam(ram).subscribe({
        next: (data: RamModel) => {
          const index = this.rams.findIndex((r) => r.id === data.id);
          this.rams[index] = data;
          this.modify = undefined;
        },
        error: (error: any) => console.error(error)
      });
    }
  }

  doDelete(ram: RamModel) {
    if (ram.id) {
      this.dataService.deleteRam(ram.id).subscribe({
        next: (data: RamModel) => {
          const index = this.rams.findIndex((r) => r.id === data.id);
          this.rams.splice(index, 1);
        },
        error: (error: any) => console.error(error)
      });
    }
  }
}
