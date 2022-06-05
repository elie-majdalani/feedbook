if(localStorage.getItem("user_id")==null || localStorage.getItem("user_id")=="0"){
    window.location.href = "index.html";
}
else{
document.getElementById("logout").addEventListener("click", function () {
  window.localStorage.setItem('user_id', 0);
  window.location.href = "index.html";
    })
    
}
