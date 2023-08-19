const form = document.getElementById("passRestoreForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch("/reset", {
 //   let response = await fetch("/api/sessions/reset", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let result = await response.json();
  if (result.status==="mismapass"){
    alert("No puede ingresar la misma password");
          Swal.fire({
            icon: 'Error Equal password ',
            toast: true,
            title: 'Error password...',
            text: 'Error equal password!!',
            position: "top-right",
            icon: "success",
          });
        }

  if (result.status==="success"){

    window.location.href="/login";
     
   };
   
   if (result.status==="novalidolink"){
    alert("No es valido el link, debe solicitar uno nuevo");
    window.location.href="/restore";
   };
  
 
});