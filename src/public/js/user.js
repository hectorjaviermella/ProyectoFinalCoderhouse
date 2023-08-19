const logout= document.getElementById("logout")
const formButton= document.getElementById('botonForm');

const home=document.getElementById("home");

var uid = document.getElementById("miInput").value;

  formButton.addEventListener("click", (e) => {
    e.preventDefault();
   
    const cartId = document.querySelector("#cid").value;
  console.log("XXXXXXXXXXX: " , cartId);
  console.log("XXXXXXXXXXX: " , uid);
   
    const prod=document.getElementById('productId');
    const value=prod.innerText.split(" ")[4]
    const title=document.getElementById("title")
    

    fetch(`/api/users/premium/${uid}`, {
      method: "GET",
    })
      .then(() => {
        Swal.fire({
          title: "User modify role!",
          error: error,
          toast: true,         
          icon: "success",
          position: "top-right",
          customClass: {
            popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
            confirmButton: "!bg-blue-600 !px-5",
            timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
          },
        });
      })
      .catch((error) => console.log(error));
  });
 
  
  home.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = "/users";
  })
  logout.addEventListener("click",(e)=>{
    fetch(`/api/sessions/logout`, {
      method: "GET",
    }) .then(() => {
      Swal.fire({
        title: "Logout successful!",
        text: `Redirecting  the login`,
        allowOutsideClick: false,
        confirmButton: false,
        icon: "success",
        timer: 3000,
        position: "top-right",
       
        customClass: {
          popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
          confirmButton: "!bg-blue-600 !px-5",
          timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
        },
        willClose: () => {
          window.location.href = "/";
        }
        
      });
    })
    .catch((error) => console.log(error));
  
  })