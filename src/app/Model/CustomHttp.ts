/*import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { LogInService } from '../log-in.service';
import { TokenManager } from "./TokenManager";
import { HttpHeaders } from "@angular/common/http/src/headers";
import { Request } from "@angular/http/src/static_request";

export class customHttp extends Http {

    constructor(backend: ConnectionBackend,
        defaultOptions: RequestOptions,private oLogInService: LogInService,
        private oTokenData: TokenManager) {
        super(backend, defaultOptions);
    }
    
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        //adding access token to each http request before calling super(..,..)
        let token = this.oTokenData.access_token;
        
        if (typeof url === 'string') {
            if (!options) {
                let options = { headers: new Headers() };
            }
            options.headers.set('Authorization', `Bearer ${token}`);
        }
        else {
            url.headers.set('Authorization', `Bearer ${token}`);
        }
        return super.request(url, options)
          .catch((error) => {
                //if got authorization error - try to update access token
                if (error.status = 401) {
                    return this.oLogInService.refreshToken(this.oTokenData);
                }
                else {
                    Observable.throw(error);
                }
            })
    }
    
}*/