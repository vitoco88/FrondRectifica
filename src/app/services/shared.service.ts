import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sharedValue: string = '';

  setValue(value: string): void {
    this.sharedValue = value;
  }

  getValue(): string {
    return this.sharedValue;
  }

  clearValue(): void {
    this.sharedValue = '';
  }
}
