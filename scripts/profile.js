// / *NOTE - if user dosnt login he is cant open this page */
if (!localStorage.getItem('skemb-user')) {
    window.location.href = '/login.html'
}

// get curren user who is login and show data on the profile page 
async function getCurrentUser(){
    const request = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('skemb-user'), 
        }, 
    });
    if (request.ok) {
        const response = await request.json();
        // console.log(response);
        const user_image = document.querySelector('.profile-card__img img');
        const user_profile_info = document.getElementById('user-profile__info');
        user_image.setAttribute('src', response.image);
        user_profile_info.innerHTML = user_profile_information(response)
    }else{
        window.location.href = '/login.html';
    }
}
window.addEventListener('load', getCurrentUser);

//*NOTE -  function return html template
function user_profile_information(user){
    return `
        <div class="profile-card__name">${user.firstName}</div>
        <div class="profile-card__txt">${user.company.title} from <strong>${user.address.city}</strong></div>
        <div class="profile-card-loc">
        <span class="profile-card-loc__txt">
        ${user.address.address} , ${user.address.city}
        </span>
        </div>

        <div class="profile-card-inf">
        <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">Company</div>
            <div class="profile-card-inf__txt">${user.company.name}</div>
        </div>

        <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">title</div>
            <div class="profile-card-inf__txt">${user.company.title}</div>
        </div>

        <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">email</div>
            <div class="profile-card-inf__txt">${user.email}</div>
        </div>

        <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">phone</div>
            <div class="profile-card-inf__txt">${user.phone}</div>
        </div>
        <div class="profile-card-inf__item">
            <div class="profile-card-inf__title">gender</div>
            <div class="profile-card-inf__txt">${user.gender}</div>
        </div>
        </div>
    `
}


/*NOTE - logout */
const logout = () => {
    localStorage.removeItem('skemb-user');
    localStorage.removeItem('user-image');
    window.location.href = '/index.html';
}
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', logout);