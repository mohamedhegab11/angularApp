
export class TokenManager {
    access_token: string;
    // "XaqOxb34UUj_ruLP-AQ9li41VXrsUZcSWX4wPLkAakWDHmltVd3vOjEQCgA5gPQG4SJBpxX5VjeZl_LyHEHjyaPuRoaSAUqMISIlzEBr9vOG1uwWgPsu4rndiXnS0B923sbxG6RQTUK76krAw9yuE3XW0A-IlQS57JMR_0iCydZ_LQxu_akK9cRb4HNRfzq7hOxf3N-SGZs6uIl6yKJD5B4t9DADEh1ZFxMyDGo4khasFc2KK9v2nCfzmpEADioX194Jis5EbTWaF3HU_xCWVy63t5GSjcYwvstizZGjSpf5ynhGH6CcoplcZY38drbz",
    token_type: string;
    expires_in: number;
    refresh_token: string;

    private tokenKey: string = 'app_token';

    private store(content: Object) {
        localStorage.setItem(this.tokenKey, JSON.stringify(content));
    }

    public GetToken() {
        let oTokenManager: TokenManager = JSON.parse(localStorage.getItem(this.tokenKey)) as TokenManager;
        if (!oTokenManager) return null;
        return oTokenManager;
    }//
}