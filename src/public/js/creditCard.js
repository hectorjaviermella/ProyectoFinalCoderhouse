var cId = document.getElementById("miInput").value;





const addToCartForms = document.querySelectorAll('[id^="addToCartForm-"]');
const logout= document.getElementById("logout");
const remove= document.getElementById("remove");

console.log("addToCartForms  ", addToCartForms);


addToCartForms.forEach((form) => {

  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    //const cId = form.querySelector("#cid").value;
    const pId = form.getAttribute("id").split("-")[1];

    const pTitle = form.closest("div").querySelector("h5").textContent;

    fetch(`/api/carts/${cId}/product/${pId}`, {
      method: "POST",
    })
      .then(() => {
        Swal.fire({
          title: "Product added to cart",
          text: `You added 1 unit of ${pTitle}`,
          toast: true,
          position: "top-right",
          icon: "success",
        
        });
      })
      .catch((error) => console.log(error));


      
  });
});
//////////////////////////////////////////////////////////////////////////
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

const removeFromCartForms = document.querySelectorAll('[id^="removeFromCartForm-"]');
const cartId = document.getElementById("miInput").textContent;


 console.log("removeFromCartForms ", removeFromCartForms);

removeFromCartForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ticketId = form.getAttribute("id").split("-")[1];
  
    //fetch(`/api/payments/payment-intents?id=${ticketId}`, {
      fetch(`/payment-intents?id=${ticketId}`, {
      method: "POST",
    })
      .then(() => {
        Swal.fire({
          title: "Ticket a pagar ",
          text: `El ticket a pagar`,
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