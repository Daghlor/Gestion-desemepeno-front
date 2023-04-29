import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  key = "Engagement.2023@";

  constructor() {}

  public createDataLocal(key: string, value: string){
    localStorage.setItem(key, this.encrypt(value));
  }

  public findDataLocal(key: string) {
    let data = localStorage.getItem(key)|| "";
    return this.decrypt(data);
  }
  public removeDataLocal(key: string) {
    localStorage.removeItem(key);
  }

  public clearAllDataLocal() {
    localStorage.clear();
  }

  public validatePermission(code: string): boolean {    
    let value = false;
    let permissions =  JSON.parse(this.findDataLocal('permissions'));
    for (let i = 0; i < permissions.length; i++) {
      if (permissions[i].code == code) {
        value = true;
        break;
      }
    }
    return value;
  }

  public validateArrayPermission(codeArray: any): boolean {    
    let value = false;
    let permissions =  JSON.parse(this.findDataLocal('permissions'));
    for (let i = 0; i < permissions.length; i++) {
      for (let k = 0; k < codeArray.length; k++) {
        if (permissions[i].code == codeArray[k]) {
          value = true;
          break;
        }
      }
    }
    return value;
  }


  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
