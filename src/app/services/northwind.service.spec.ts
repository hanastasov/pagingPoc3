import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NORTHWINDService } from './northwind.service';

describe('NORTHWINDService', () => {
  let service: NORTHWINDService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(NORTHWINDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
