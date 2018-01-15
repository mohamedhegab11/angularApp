import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SessionDataService {

  constructor() { }

  private oBehaviorSubject = new BehaviorSubject<KeyValue[]>([]);


  changeMessage(key: string,value: string) {
    if (window.sessionStorage !== undefined) {
      console.log("the browser support session Storage --> Set");
      sessionStorage.setItem(key, value);
    }else if (window.localStorage !== undefined) {
      console.log("the browser support Local Storage --> Set");
      localStorage.setItem(key, value);
    } else {
      console.log("the browser not support Local Storage")
      let BehaviorSubjectData = this.getNewBehaviorSubjectData(key, value);
      this.oBehaviorSubject.next(BehaviorSubjectData);
    }
  }

  getValue(key: string) : string {
    if (window.sessionStorage !== undefined) {
      console.log("the browser support session Storage --> get");
      return sessionStorage.getItem(key);
    }else if (window.localStorage !== undefined) {
     console.log("the browser support Local Storage --> get");
      return localStorage.getItem(key);
    } else {
      console.log("the browser not support Local Storage")
      return this.searchBehaviorSubjectData(key).value;
    }
  }

  private getNewBehaviorSubjectData(key: string,value: string):KeyValue[]{
    let BehaviorSubjectData = [];
    this.oBehaviorSubject.asObservable().subscribe(x => {
      for(let i=0; i<x.length;i++){
        if (x[i].key==key){
          x[i].value = value;
          BehaviorSubjectData =x;
          return BehaviorSubjectData;
        }
      }
    })
    BehaviorSubjectData.push({ key: key, value: value});
    return BehaviorSubjectData;
  }

  

 private searchBehaviorSubjectData(key: string):KeyValue{
    this.oBehaviorSubject.asObservable().subscribe(x => {
      x.forEach((item, index) => {
        if (item.key == key) return item;
     })
    })
    return { key: key, value: ""} as KeyValue;;
  }

}




export class KeyValue {
  key: string;
  value: string;
}
