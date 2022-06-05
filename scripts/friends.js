function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("burger").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("burger").style.marginLeft = "0";
}

url = "./backend/show-friends.php";
data = {
  input: localStorage.getItem("user_id")
}
axios({
  method: 'get',
  url: url,
  params: data
})
  .then(function (response) {
    response
    output = "";
    for (i = 0; i < response.data.length; i++) {

    if(response.data[i].relation=="1"){
      output += `
      <div class="friend-div friends" >
      <p style="display:none">${response.data[i].friend_id}</p>
      <img src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.6435-9/156112152_3872412176154913_197491733048019091_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2T17NiJFXuMAX_FSl66&_nc_ht=scontent.fbey5-1.fna&oh=00_AT_YoObDiRYGXc02b3IVy8rh7W0N1T_S66uOhtAesijRAw&oe=62BFD4D2" alt="Avatar" class="avatar-img"/>
      <span>${response.data[i].full_name}</span>
      <button class="block-btn" id="block">Block</button>
      <button class="remove-friend-btn" id="unfriend">Remove Friend</button>
      </div>`
    }
    if(response.data[i].relation=="0"){
      output += `
      <div class="friend-div friend-requests">
      <p style="display:none">${response.data[i].friend_id}</p>
      <img src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.6435-9/156112152_3872412176154913_197491733048019091_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2T17NiJFXuMAX_FSl66&_nc_ht=scontent.fbey5-1.fna&oh=00_AT_YoObDiRYGXc02b3IVy8rh7W0N1T_S66uOhtAesijRAw&oe=62BFD4D2" alt="Avatar" class="avatar-img"/>
      <span>${response.data[i].full_name}</span>
      <button class="block-btn" id="block">Block</button>
      <button class="add-friend-btn" id="accept">Accept Friend</button>
      </div>`
    }
    if(response.data[i].relation=="-1"){
      output += `
      <div class="friend-div blocked">
      <p style="display:none">${response.data[i].friend_id}</p>
      <img src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.6435-9/156112152_3872412176154913_197491733048019091_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2T17NiJFXuMAX_FSl66&_nc_ht=scontent.fbey5-1.fna&oh=00_AT_YoObDiRYGXc02b3IVy8rh7W0N1T_S66uOhtAesijRAw&oe=62BFD4D2" alt="Avatar" class="avatar-img"/>
      <span>${response.data[i].full_name}</span>
      <button class="unblock-btn" id="unblock">Unblock</button>
      </div>`
    }
  }
  document.getElementById("friends-list").innerHTML = output;
})

window.onload = function () {
  if (document.getElementById("unfriend")) {
    document.getElementById("unfriend").addEventListener("click", function (e) {
      data = {
        id: localStorage.getItem("user_id"),
        friend_id: e.currentTarget.parentElement.firstChild.nextElementSibling.textContent
      }
      debugger
      url = "./backend/reset-relationship.php";
      axios({
        method: 'POST',
        url,
        params: data
      })
        .then(function (response) {
          debugger
          location.reload()
        })
    })
  }
  if (document.getElementById("reject")) {
    document.getElementById("reject").addEventListener("click", function (e) {
      data = {
        id: localStorage.getItem("user_id"),
        friend_id: e.currentTarget.parentElement.firstChild.nextElementSibling.textContent
      }
      url = "./backend/reset-relationship.php";
      axios({
        method: 'POST',
        url,
        params: data
      })
        .then(function (response) {
          location.reload()
        })
    })
  }
  if (document.getElementById("accept")) {
    document.getElementById("accept").addEventListener("click", function (e) {
      data = {
        id: localStorage.getItem("user_id"),
        friend_id: e.currentTarget.parentElement.firstChild.nextElementSibling.textContent
      }
      url = "./backend/accept-friend.php";
      axios({
        method: 'POST',
        url,
        params: data
      })
        .then(function (response) {
          location.reload()
        })
    })
  }
  if (document.getElementById("unblock")) {
    document.getElementById("unblock").addEventListener("click", function (e) {
      data = {
        id: localStorage.getItem("user_id"),
        friend_id: e.currentTarget.parentElement.firstChild.nextElementSibling.textContent
      }
      url = "./backend/reset-relationship.php";
      axios({
        method: 'POST',
        url,
        params: data
      })
        .then(function (response) {
          location.reload()
        })
    })
  }
  if (document.getElementById("block")) {
    document.getElementById("block").addEventListener("click", function (e) {
      debugger
      data = {
        id: localStorage.getItem("user_id"),
        friend_id: e.currentTarget.parentElement.firstChild.nextElementSibling.textContent
      }
      url = "./backend/block-friend.php";
      axios({
        method: 'POST',
        url,
        params: data
      }).then(function (response) {
        location.reload()
      })
    })
  }
}
friends = document.getElementById("friends-list")    
for (i = 0; i < friends.childElementCount; i++) {
  debugger
  if (friends.children[i].className == "blocked") {
    friends.children[i].style.display = "none"
  }
  if(friends.children[i].className == "friend-requests"){
    friends.children[i].style.display = "none"
  }
  if(friends.children[i].className == "friends"){
    friends.children[i].style.display = "block"
  }
}
debugger
document.getElementById("blocked-friends").addEventListener("click", function(){
  for (i = 0; i < friends.childElementCount; i++) {
    if (friends.children[i].className == "blocked") {
      friends.children[i].style.display = "block"
    }
    if(friends.children[i].className == "friend-requests"){
      friends.children[i].style.display = "none"
    }
    if(friends.children[i].className == "friends"){
      friends.children[i].style.display = "none"
    }
  }
})
document.getElementById("blocked-friends").addEventListener("click", function(){
  for (i = 0; i < friends.childElementCount; i++) {
    if (friends.children[i].className == "blocked") {
      friends.children[i].style.display = "none"
    }
    if(friends.children[i].className == "friend-requests"){
      friends.children[i].style.display = "block"
    }
    if(friends.children[i].className == "friends"){
      friends.children[i].style.display = "none"
    }
  }
})
