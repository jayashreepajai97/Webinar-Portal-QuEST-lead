import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorage, SessionStorageService } from 'ngx-store'
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(public local: SessionStorageService) { }
  setData(data: Object) {
    this.local.set("user", data);
    return true;
  }
  getData() {
    return (this.local.get("user") || false)
  }
  getItem(item: any) {
    if (this.local.get("user") !== undefined) {

      let data = this.getData();
      if (this.checkOwnProperty(item, data)) {
        return data[item];
      }
      return false;
    }
    return false;
  }
  setItem(obj, item) {
    if (this.local.get("user") !== undefined) {
      let data = this.getData();
      data[obj] = item;
      this.local.set("user", data);
    }
    return false;
  }
  clear() {
    this.local.clear();
  }
  private checkOwnProperty(needle, haystack) {
    return haystack.hasOwnProperty(needle)
  }
}
