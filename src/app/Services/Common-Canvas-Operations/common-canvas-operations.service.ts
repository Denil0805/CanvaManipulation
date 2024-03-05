import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonCanvasOperationsService {


  checkTextFieldValidation(username: string, maxLength: number): boolean {
    const hasSpaces = /\s/.test(username);

    if (!hasSpaces && username.length > maxLength) {
      return true; 
    } else {
      return false; 
    }
  }
}
