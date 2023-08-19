const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  
  console.log("obj " ,obj);

  let response = await fetch("/api/sessions/register", {
    method: "POST",
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
      icon: 'Dato  incorrect',
      toast: true,
      title: 'Error...',
      text: 'Algun dato esta incorrecto!!',
      position: "top-right",
      icon: "success",
    })
  }
});