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
      if (response.data[i].relation == "1") {
        output += `
      <div class="friend-div friends" >
      <p style="display:none">${response.data[i].friend_id}</p>
      <img src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.6435-9/156112152_3872412176154913_197491733048019091_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2T17NiJFXuMAX_FSl66&_nc_ht=scontent.fbey5-1.fna&oh=00_AT_YoObDiRYGXc02b3IVy8rh7W0N1T_S66uOhtAesijRAw&oe=62BFD4D2" alt="Avatar" class="avatar-img"/>
      <span>${response.data[i].full_name}</span>
      <button class="block-btn" id="block">Block</button>
      <button class="remove-friend-btn" id="unfriend">Remove Friend</button>
      </div>`
      }
      debugger
      if (response.data[i].relation == "0") {
        output += `
      <div class="friend-div friend-requests">
      <p style="display:none">${response.data[i].friend_id}</p>
      <img src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.6435-9/156112152_3872412176154913_197491733048019091_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2T17NiJFXuMAX_FSl66&_nc_ht=scontent.fbey5-1.fna&oh=00_AT_YoObDiRYGXc02b3IVy8rh7W0N1T_S66uOhtAesijRAw&oe=62BFD4D2" alt="Avatar" class="avatar-img"/>
      <span>${response.data[i].full_name}</span>
      <button class="block-btn" id="block">Block</button>
      <button class="add-friend-btn" id="accept">Accept Friend</button>
      </div>`
      }
      if (response.data[i].relation == "-1") {
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
    blockbtn = document.getElementsByClassName("block-btn")
    for (i = 0; i < blockbtn.length; i++) {
      blockbtn[i].addEventListener("click", function (e) {
        e.preventDefault();
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
          console.log("hy")
        })
      })
    }
    addFriend = document.getElementsByClassName("add-friend-btn")
    for (i = 0; i < addFriend.length; i++) {
      addFriend[i].addEventListener("click", function (e) {
        debugger
        e.preventDefault();
        data = {
          id: localStorage.getItem("user_id"),
          friend_id: e.currentTarget.parentElement.firstChild.nextElementSibling.textContent
        }
        url = "./backend/send-friend-request.php";
        axios({
          method: 'POST',
          url,
          params: data
        }).then(function (response) {
          console.log("hy")
        })
      })
    }
    unblockBtn=document.getElementsByClassName("unblock-btn")
    for (i = 0; i < unblockBtn.length; i++) {
      unblockBtn[i].addEventListener("click", function (e) {
        e.preventDefault();
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
        })}
    unfriend = document.getElementsByClassName("remove-friend-btn")
    for (i = 0; i < unfriend.length; i++) {
      unfriend[i].addEventListener("click", function (e) {
        e.preventDefault();
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
        })
      })
    }
    friends = document.getElementById("friends-list")
    for (i = 0; i < friends.childElementCount; i++) {
      debugger
      if (friends.children[i].classList.value.includes("blocked")) {
        friends.children[i].classList.add("display-none")
      }
      if (friends.children[i].classList.value.includes("friend-requests")) {
        friends.children[i].classList.add("display-none")
      }
      if (friends.children[i].classList.value.includes("friends")) {
        friends.children[i].classList.remove("display-none")
      }
    }
    debugger
    document.getElementById("blocked-friends").addEventListener("click", function (e) {
      debugger
      for (i = 0; i < friends.childElementCount; i++) {
        if (friends.children[i].classList.value.includes("blocked")) {
          friends.children[i].classList.remove("display-none")
        }
        if (friends.children[i].classList.value.includes("friend-requests")) {
          friends.children[i].style.display = "none"
        }
        if (friends.children[i].classList.value.includes("friends")) {
          friends.children[i].style.display = "none"
        }
      }
    })
    document.getElementById("requested-friends").addEventListener("click", function (e) {
      for (i = 0; i < friends.childElementCount; i++) {
        if (friends.children[i].classList.value.includes("blocked")) {
          friends.children[i].style.display = "none"
        }
        if (friends.children[i].classList.value.includes("friend-requests")) {
          friends.children[i].classList.remove("display-none")
        }
        if (friends.children[i].classList.value.includes("friends")) {
          friends.children[i].style.display = "none"
        }
      }
    })
    document.getElementById("logout").addEventListener("click", function () {
      localStorage.setItem("user_id",0)
      window.location.href = "index.html";
    })

  })

