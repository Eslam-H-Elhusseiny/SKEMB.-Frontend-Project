
/////////// *NOTE -    login page       //////////////

// check if user has user_token in localstorage, if itis,  get values from server and set them to inputs 
async function remember(){
    const user_token = localStorage.getItem('user-token');
    if (user_token) {
        const req = await fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + user_token, 
            }, 
        });
        if(req.ok){
            const res = await req.json();
            document.querySelector('input[name=username]').value = res.username
            document.querySelector('input[name=password]').value = res.password
        }else{
            // if token number expire delete user token and user image from localstorage
            localStorage.removeItem('user-token');
            localStorage.removeItem('user-image');
        }

    }
}
window.addEventListener('load', remember)


// regular expression using moduls, if user data true, send data to server  else show error to user
import { username_validate, password_validate , faildRegex} from "./moduls/validateUserData.js";
async function authUser(){
    event.preventDefault();
    let formdata = new FormData(this);   // get inputs data using FormData object 
    // validate username and password using regex
    const nameRegex = username_validate(formdata.get('username'));
    const passwordRegex = password_validate(formdata.get('password'));
    if(!nameRegex || !passwordRegex){
        // print faild regex to user
        const inputName = ['username', 'password'];
        inputName.forEach(element => {
            if(Object.hasOwnProperty.call(faildRegex, element)){
                document.querySelector(`input[name=${element}]`).parentElement.nextElementSibling.innerHTML = `<span>${faildRegex[element]}</span>`
                delete faildRegex[element]
            }else{
                document.querySelector(`input[name=${element}]`).parentElement.nextElementSibling.innerHTML = ``
            }
        });
        return false;
    } 

    // auth user
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                username: formdata.get('username'),
                password: formdata.get('password'),
            })
        })

        if (!response.ok) {
            throw new Error('Please verify your data');
        }else{
            const res = await response.json();
            localStorage.setItem('user-token', res.token);
            localStorage.setItem('user-image', res.image);
            window.location.href = '/index.html';
        }
    } catch (error) {
       document.querySelectorAll('.error').forEach(element => {
           element.innerHTML = `<span>${error}</span>`
       })
    }
}; 
const login_submit = document.querySelector('#login-submit');
login_submit.addEventListener('submit', authUser);