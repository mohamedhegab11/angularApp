//import { Cookie } from '';
import { CookieService } from 'ngx-cookie-service';

export class LocalStorageManagement {
    //private cookieService: CookieService =new CookieService();
    public store(sKeyName:string,oValue:object) {
        //localStorage.setItem(sKeyName, JSON.stringify(oValue));
       // Cookie.setCookie('cookieName', 'cookieValue');
    }

    public storeStr(sKeyName:string,oValue:string) {
        localStorage.setItem(sKeyName, oValue);
    }

    public GetToken(sKeyName:string) {
        let oValue: object = JSON.parse(localStorage.getItem(sKeyName));
        if (!oValue) return null;
        return oValue;
    }//
}