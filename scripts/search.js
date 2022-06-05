function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("burger").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("burger").style.marginLeft = "0";
}
document.getElementById("search-button").addEventListener("click", function (e) {
  e.preventDefault();
  searchValue = document.getElementById("search-bar").value;
  user_id = localStorage.getItem("user_id");
  data = {
    searchValue,
    user_id
  }
  url = "./backend/search.php";
  axios({
    method: 'POST',
    url,
    params: data
  })
    .then(function (response) {
      let result = response.data;
      let output = "";
      for (i = 0; i < response.data.length; i++) {
        output += `
                  <div class="friend-div">
                  <p style="display:none">${response.data[i].id}</p>
                  <img src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.6435-9/156112152_3872412176154913_197491733048019091_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2T17NiJFXuMAX_FSl66&_nc_ht=scontent.fbey5-1.fna&oh=00_AT_YoObDiRYGXc02b3IVy8rh7W0N1T_S66uOhtAesijRAw&oe=62BFD4D2" alt="Avatar" class="avatar-img"/>
                  <span>${response.data[i].full_name}</span>`
        if (response.data[i].relation == "1") {
          output += `
                <button class="block-btn">Block</button>
                <button class="remove-friend-btn" id="unfriend">Remove Friend</button>
                </div>`
        }else
        if (response.data[i].relation == "0") {
          output += `
                <button class="add-friend-btn">Accept</button>
                <button class="remove-friend-btn" id="unfriend">Reject</button>
                <button class="block-btn">Block</button>
                </div>`
        }
        else{
          output += `
          <button class="add-friend-btn">Send Friend Request</button>
          <button class="block-btn" id="accept">Block</button>
          </div>`
        }
      }
      document.getElementById("main-friends-divs").innerHTML = output;
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
    })
});