var cId = document.getElementById("miInput").value;
var Idprod = document.getElementById("Idprod").value;

///const ticket= document.getElementById("ticket");
const logout= document.getElementById("logout");
const removetocart= document.getElementById("removetocart");


logout.addEventListener("click",(e)=>{
  fetch(`/api/sessions/logout`, {
    method: "GET",
  }) .then(() => {
    Swal.fire({
      title: "Logout successful",
      text: `Redirecting  the login`,
      allowOutsideClick: false,
      confirmButton: false,
      icon: "success",
      timer: 3000,
      //timerProgressBar: true,
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

});

///////////////////////////////////////////////////////////////

const removeFromCartForms = document.querySelectorAll(
  '[id^="removeFromCartForm-"]'
);

const cartId = document.getElementById("miInput").textContent;

removeFromCartForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const productId = form.getAttribute("id").split("-")[1];
    
    fetch(`/api/carts/${cId}/product/${Idprod}`, {
      method: "DELETE",
    })
      .then(() => {
        Swal.fire({
          title: "Remove to cart",
      text: `Remove product to cart`,
      allowOutsideClick: false,
      confirmButton: false,
      icon: "success",
      timer: 3000,
        
        });
        setTimeout(() => {
          location.reload();
        }, 4000);
      })
      .catch((error) => console.log(error));
  });
});