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
  
  })