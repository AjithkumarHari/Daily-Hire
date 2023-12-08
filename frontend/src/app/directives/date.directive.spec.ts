import { ElementRef, Renderer2 } from '@angular/core';
import { DateDirective } from './date.directive';

describe('DateDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = {} as ElementRef; 
    const rendererMock = {} as Renderer2; 
    const directive = new DateDirective(elementRefMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
