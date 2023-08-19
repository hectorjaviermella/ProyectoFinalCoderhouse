const form = document.getElementById("loginForm");
const inputEmail=document.getElementById("email");
const inputPass=document.getElementById("password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }) 
  console.log("antes del if")
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




