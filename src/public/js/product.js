const logout= document.getElementById("logout")
const formButton= document.getElementById('botonForm');

const home=document.getElementById("home");

  formButton.addEventListener("click", (e) => {
    e.preventDefault();
   
    const cartId = document.querySelector("#cid").value;
  console.log("XXXXXXXXXXX: " , cartId);
  console.log("XXXXXXXXXXX: " , this._id);
   
    const prod=document.getElementById('productId');
    const value=prod.innerText.split(" ")[4]
    const title=document.getElementById("title")
    

    fetch(`/api/carts/${cartId}/product/${value}`, {
      method: "POST",
    })
      .then(() => {
        Swal.fire({
          title: "Product added to cart!",
          text: `You added 1 unit of the product ${title.innerHTML}`,
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
    window.location.href = "/products";
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