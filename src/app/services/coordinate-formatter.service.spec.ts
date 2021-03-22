import { DecimalPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { CoordinateFormatterService } from './coordinate-formatter.service';

describe('service', () => {
  let service: CoordinateFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecimalPipe],
    });
    service = TestBed.inject(CoordinateFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('numberCoordinates', () => {
    it('formats lon/lat coordinates', () => {
      const coords = [7.1234, 46.9876];
      expect(service.numberCoordinates(coords)).toBe('7 47');
      expect(
        service.numberCoordinates(
          coords,
          2,
          'co {x} E; {y} N',
        ),
      ).toBe('co 7.12 E; 46.99 N');
    });

    it('formats metric coordinates', () => {
      const coords = [2600000, 1600000];
      expect(
        service.numberCoordinates(coords, 0, '{x}, {y}'),
      ).toBe('2,600,000, 1,600,000');
    });

    it('formats with correct number of digits', () => {
      const coords = [2600000, 1600000];
      expect(
        service.numberCoordinates(coords, 4, '{x}, {y}'),
      ).toBe('2,600,000.0000, 1,600,000.0000');
    });

    it('formats with a template', () => {
      const coords = [2600000, 1600000];
      expect(
        service.numberCoordinates(coords, 0, '{x}, {y} m'),
      ).toBe('2,600,000, 1,600,000 m');
    });
  });
});
