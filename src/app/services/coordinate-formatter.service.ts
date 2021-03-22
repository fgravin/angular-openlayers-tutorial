import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CoordinateFormatterService {
  constructor(private decimalPipe: DecimalPipe) {}

  numberCoordinates(
    coordinates: number[],
    fractionDigits: number = 0,
    template?: string,
  ) {
    template = template || '{x} {y}';

    const x = coordinates[0];
    const y = coordinates[1];
    const digitsInfo = `1.${fractionDigits}-${fractionDigits}`;
    const sX = this.decimalPipe.transform(x, digitsInfo);
    const sY = this.decimalPipe.transform(y, digitsInfo);
    return template.replace('{x}', sX).replace('{y}', sY);
  }
}
