class ApplicationApi {

    constructor(){
        this.apiUrl = "http://api.code.tavanito.ir/v1";
    }

    getOTPCode(mobile){
        const headers = new Headers();
        headers.append("Accept", "application/json");

        const formdata = new FormData();
        formdata.append("mobile", mobile);

        const promise = fetch(`${this.apiUrl}/login/otp`, {
            method: "POST",
            headers,
            body: formdata
        }).then((response) => {
            if(response.status !== 200){
                return response.json().then((error) => {
                    throw error;
                });
            }
            return response.json();
        });

        return promise;
    }

    loginWithOTP(mobile, code){
        const headers = new Headers();
        headers.append("Accept", "application/json");

        const formdata = new FormData();
        formdata.append("mobile", mobile);

        const promise = fetch(`${this.apiUrl}/login?mobile=${mobile}&code=${code}`, {
            method: "POST",
            headers,
            body: formdata
        }).then((response) => {
            if(response.status !== 200){
                return response.json().then((error) => {
                    throw error;
                });
            }

            return response.json();
        }).then((result) => {
            const accessToken = result.access_token;
            const refreshToken = result.refresh_token;
            const expiresIn = result.expires_in;
            const tokenType = result.token_type;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("expiresIn", expiresIn);
            localStorage.setItem("tokenType", tokenType);

            const userData = result.data;
            const user = {
                first_name: userData && userData.first_name,
                last_name: userData && userData.last_name,
                email: userData && userData.email,
                avatar: userData && userData.avatar,
                mobile: userData && userData.mobile
            };

            return user;
        });

        return promise;
    }

    getUserInfo(){
        const accessToken = localStorage.getItem("accessToken");
        const tokenType = localStorage.getItem("tokenType");

        const headers = new Headers();
        headers.append("Accept", "application/json");

        if(accessToken && tokenType){
            headers.append("Authorization", `${tokenType} ${accessToken}`);
        }

        const promise = fetch(`${this.apiUrl}/user`, {
            method: 'GET',
            headers
        }).then((response) => {
            if(response.status !== 200){
                return response.json().then((error) => {
                    throw error;
                });
            }
            return response.json();
        });

        return promise;
    }

    updateUserInfo(user){
        const accessToken = localStorage.getItem("accessToken");
        const tokenType = localStorage.getItem("tokenType");

        const headers = new Headers();
        headers.append("Accept", "application/json");
        
        if(accessToken && tokenType){
            headers.append("Authorization", `${tokenType} ${accessToken}`);
        }

        const formdata = new FormData();

        const fields = [
            "first_name",
            "last_name",
            "email",
            // "telephone",
            // "mobile",
            // "national_code"
        ];

        fields.forEach((field) => {
            if(isSet(user[field])){
                formdata.append(field, user[field]);
            }
        });

        const promise = fetch(`${this.apiUrl}/user`, {
            method: 'PUT',
            headers,
            body: formdata
        }).then((response) => {
            if(response.status !== 200){
                return response.json().then((error) => {
                    throw error;
                });
            }
            return response.json();
        });

        return promise;
    }
}

function isSet(value) {
    return value !== null && value !== undefined;
}

export default ApplicationApi;