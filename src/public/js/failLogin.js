const form = document.getElementById("passRestoreForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch("/api/sessions/failLogin", {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let result = await response.json();
  if (result.status==="sucess"){
  
    window.location.href="/login";
     
   }else
   { 
     Swal.fire({
       icon: 'User incorrect',
       toast: true,
       title: 'Error...',
       text: 'Error al restord password!!',
       position: "top-right",
       icon: "success",
     })
   }
});