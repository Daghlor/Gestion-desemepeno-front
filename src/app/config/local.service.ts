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


  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
