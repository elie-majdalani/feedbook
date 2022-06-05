if(localStorage.getItem("user_id")==null || localStorage.getItem("user_id")=="0" || localStorage.getItem("user_id") == undefined){
// Get the modal
var modal = document.getElementById("adds");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = 'block';
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

document.getElementById("login").addEventListener("click", function () {
  user_login = document.getElementById("email_login").value;
  user_pass = document.getElementById("pass").value;
  let data = {
    user_login,
    user_pass
  }
  url = "./backend/login.php";
  axios({
    method: 'POST',
    url,
    params: data
})
    .then(function (response) {
        let result = response.data;
        let id = result.user_id;
        debugger
        if(typeof(id) == 'undefined'){
          window.localStorage.setItem('user_id', 0);
          alert('Invalid user');
        }
        else{
        window.localStorage.setItem('user_id', id);
        window.location.href = "index.html";
}
    })
})

document.getElementById("ceate").addEventListener("click", function () {
  user_name = document.getElementById("username_signup").value
  user_email = document.getElementById("email_signup").value
  user_fullName = document.getElementById("full_name").value
  user_pass = document.getElementById("password_signup").value
  user_gender = document.getElementsByClassName("level");
  for (element in user_gender){
    if(typeof user_gender[element] === 'object'){
    if(user_gender[element].checked){
      user_gender = user_gender[element].value
    }}
  }
  user_date = document.getElementById("day").value;
  debugger
  let data = {
    user_name,
    user_email,
    user_fullName,
    user_pass,
    user_gender,
    user_date
  }
  url = "./backend/signup.php";
  axios({
    method: 'POST',
    url,
    params: data
})
    .then(function (response) {
        debugger
        console.log(response.data)
        window.location.href = "profile.html";

    })
})
}
else{
  window.location.href = "profile.html";
}
