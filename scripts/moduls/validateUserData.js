// validate data when user is login  <== befor send to server
export const faildRegex = {};
export function username_validate(username){
    const usernameRegex = /^[a-zA-Z][^<>?!";$@&]{5,25}$/;
    if (usernameRegex.test(username) ) {
        return true;
    }else{
        faildRegex['username'] = 'please insert corect username ...';
        return false;
    }
}

export function password_validate(password){
    const passwordRegex = /^[a-zA-Z0-9][^<>?!";$@&]{5,12}$/;
     if (passwordRegex.test(password) ) {
        return true;
    }else{
        faildRegex['password'] = 'please insert corect password ...';
        return false;
    }
}
