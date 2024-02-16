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
        const image = document.getElementById('user-img');
        const user_data = document.getElementById('profile-data')
        image.innerHTML = `<img src="${response.image}" alt="image">`;
        user_data.innerHTML = `
            <div class="profile_user_name w-75 text-center rounded mt-3 d-flex align-center justify-center">
                <h1>${response.firstName}</h1>
            </div>
            <div class="container_user_data">
            <div class="user_data"> <span class="data_title">company : </span> <span class="data_value">${response.company.name}</span></div>
            <div class="user_data"> <span class="data_title">titel : </span> <span class="data_value">${response.company.title}</span></div>
                <div class="user_data"> <span class="data_title">email : </span> <span class="data_value">${response.email}</span></div>
                <div class="user_data"> <span class="data_title">phone : </span> <span class="data_value">${response.phone}</span></div>
                <div class="user_data"> <span class="data_title">gender : </span> <span class="data_value">${response.gender}</span></div> 
            </div>
        `
    }else{
        window.location.href = '/login.html';
    }
}
window.addEventListener('load', getCurrentUser);

/*NOTE - logout */
const logout = () => {
    localStorage.removeItem('skemb-user');
    localStorage.removeItem('user-image');
    window.location.href = '/index.html';
}
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', logout);