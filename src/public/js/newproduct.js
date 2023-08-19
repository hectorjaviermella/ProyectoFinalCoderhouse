const form = document.getElementById("newproductForm");
const pTitle=document.getElementById("pTitle");
const pDescription=document.getElementById("pDescription");
const pCode=document.getElementById("pCode");
const pPrice=document.getElementById("pPrice");
const pOwner=document.getElementById("pOwner");
const pStatus=document.getElementById("pStatus");
const pStock=document.getElementById("pStock");
const pCategory=document.getElementById("pCategory");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }) 

  if(response.ok){
    //if (result.status==="sucess"){
    window.location.href = "/products";
  }else{
    Swal.fire({
      icon: 'User incorrect',
      toast: true,
      title: 'Error...',
      text: 'Error al ingresar las credenciales!!',
      position: "top-right",
      icon: "success",
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////
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
