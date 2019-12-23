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
                throw response.json();
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
            return response.json();
        });

        return promise;
    }

    getUserInfo(){
        const headers = new Headers();
        headers.append("Accept", "application/json");

        const promise = fetch(`${this.apiUrl}/user`, {
            method: 'GET',
            headers
        }).then((response) => {
            return response.json();
        });

        return promise;
    }

    updateUserInfo(user){
        const headers = new Headers();
        headers.append("Accept", "application/json");

        const formdata = new FormData();

        if(user.first_name !== null && user.first_name !== undefined){
            formdata.append("first_name", user.first_name);
        }
        if(user.last_name !== null && user.last_name !== undefined){
            formdata.append("last_name", user.last_name);
        }
        if(user.email !== null && user.email !== undefined){
            formdata.append("email", user.email);
        }

        const promise = fetch(`${this.apiUrl}/user`, {
            method: 'PUT',
            headers,
            body: formdata
        }).then((response) => {
            return response.json();
        });

        return promise;
    }
}

export default ApplicationApi;