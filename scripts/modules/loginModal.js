const LoginModal = () => {
    const modal = document.createElement('div');
    modal.className = 'loginModal d-flex align-center justify-center ';
  
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modalContainer px-3 py-5 position-relative d-flex align-center justify-center flex-col';
    
    const paragraph = document.createElement('p');
    paragraph.textContent = 'You are not logged in. Please log in to access this feature.';
    paragraph.classList ='mb-3'

    const loginButton = document.createElement('button');
    loginButton.textContent = 'Log In';
    loginButton.className = 'goLogin w-30 mx-auto px-3 py-2';
    loginButton.addEventListener('click', () => {
      window.location.href = 'login.html'; 
    });
    const closeModal = document.createElement('i');
    closeModal.className = 'fa-solid fa-circle-xmark closeModal';
    
    closeModal.addEventListener('click' , ()=>{
        modal.classList.replace('d-flex','d-none')
        document.body.style.overflow = 'auto';
    })
    document.addEventListener('click' , (e)=>{
        if (e.target == modal) {
            modal.classList.replace('d-flex','d-none')
            document.body.style.overflow = 'auto';    
        }
    })
    modalContainer.appendChild(paragraph);
    modalContainer.appendChild(closeModal);
    modalContainer.appendChild(loginButton);
    modal.appendChild(modalContainer);
  
    return modal;
  };
  
  export default LoginModal;
  