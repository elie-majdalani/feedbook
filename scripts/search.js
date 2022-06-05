function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("burger").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("burger").style.marginLeft= "0";
  }
  document.getElementById("search-button").addEventListener("click", function()  {
    debugger
    searchValue = document.getElementById("search-bar").value;
      data = {
        searchValue
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
                debugger
                output += `
                  <div class="friend-div">
                  <p style="display:none">${response.data[i].friend_id}</p>
                  <img src="https://scontent.fbey5-1.fna.fbcdn.net/v/t1.6435-9/156112152_3872412176154913_197491733048019091_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2T17NiJFXuMAX_FSl66&_nc_ht=scontent.fbey5-1.fna&oh=00_AT_YoObDiRYGXc02b3IVy8rh7W0N1T_S66uOhtAesijRAw&oe=62BFD4D2" alt="Avatar" class="avatar-img"/>
                  <span>${response.data[i].full_name}</span>`
              if(response.data[i].relation=="1"){
                output +=`
                <button class="block-btn" id="block">Block</button>
                <button class="remove-friend-btn" id="unfriend">Remove Friend</button>
                </div>`
              }
              if(response.data[i].relation=="0"){
                output +=`
                <button class="block-btn" id="block">Block</button>
                <button class="add-friend-btn" id="accept">Accept Friend</button>
                </div>`
              }
              if(response.data[i].relation=="-1"){
                output +=`
                <button class="unblock-btn" id="unblock">Unblock</button>
                </div>`
              }
            }
            debugger
            document.getElementById("main-friends-divs").innerHTML = output;
          })
  });