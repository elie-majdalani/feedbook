function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
document.getElementById("add-post-button").addEventListener("click", function () {
  text = document.getElementById("add-post").value
  user_id = localStorage.getItem("user_id")
  img = ""
  data = {
    img,
    text,
    user_id
  }
  url = "./backend/post.php"
  axios({
    method: 'POST',
    url,
    params: data
  }).then(function (response) {
    debugger
    output = ``
    output +=`
    <div class="post">
    <div class="post-header">
      <div class="right-post-header">
        <div class="avatar">
          <img
            src="https://e7.pngegg.com/pngimages/10/446/png-clipart-roblox-corporation-doge-dog-breed-others-template-game.png">
        </div>
        <div class="name">
          <h3>${user_name}</h3>
        </div>
      </div>
      <div class="left-post-header">
        <div class="delete-post">
          <button type="button" class="delete-post-btn" value ="${localStorage.getItem("user_id")}">x</button>
        </div>
      </div>
    </div>
   

    <div class="post-content">
      <span> ${text}</span>
      <img src="https://a.cdn-hotels.com/gdcs/production180/d1647/96f1181c-6751-4d1b-926d-e39039f30d66.jpg?impolicy=fcrop&w=800&h=533&q=medium" />
    </div>
    <div class="post-likes">
    <span>0<img src="./assets/like.jpg"/></span>
  </div>
  <div class="post-footer">
    <button class="post-footer-btn">Like</button>
    <button class="post-footer-btn">Comment</button>

  </div>
  <div class="post-comments-section">
    <div class="comments">
    <div class="comment-container">
    <div class="comment">
    </div>
    </div>
    </div>
    <div class="my-comment-section">
      <div class="my-avatar">
        <img src="https://e7.pngegg.com/pngimages/10/446/png-clipart-roblox-corporation-doge-dog-breed-others-template-game.png" />
      </div>
      <div class="my-comment">
        <input class="my-comment-imput" />
      </div>
    </div>

  </div>
</div>`
    posts.innerHTML += output
  })
})
posts = document.getElementById("posts")
url = "./backend/show-posts.php"
user_id = localStorage.getItem("goto")
data = {
  user_id
}
axios({
  method: 'POST',
  url,
  params: data
}).then(function (response0) {
  output = ""
  for (i = 0; i < response0.data.length; i++) {
    user_name = response0.data[i].full_name
    output +=`
    <div class="post">
    <div class="post-header">
      <div class="right-post-header">
        <div class="avatar">
          <img
            src="https://e7.pngegg.com/pngimages/10/446/png-clipart-roblox-corporation-doge-dog-breed-others-template-game.png">
        </div>
        <div class="name">
          <h3>${response0.data[i].full_name}</h3>
        </div>
      </div>
      <div class="left-post-header">
        <div class="delete-post">
          <button type="button" class="delete-post-btn" value ="${response0.data[i].id}">x</button>
        </div>
      </div>
    </div>
   

    <div class="post-content">
      <span> ${response0.data[i].text}</span>
      <img src="https://a.cdn-hotels.com/gdcs/production180/d1647/96f1181c-6751-4d1b-926d-e39039f30d66.jpg?impolicy=fcrop&w=800&h=533&q=medium" />
    </div>`
 
    url="./backend/show-post-likes.php"
    data = {
      post_id: response0.data[i].id
    }
    axios({
      method: 'POST',
      url,
      params: data
    }).then(function (response1) {
      output +=`
      <div class="post-likes">
      <span>${response1.data[0].likes}<img src="./assets/like.jpg"/></span>
    </div>
    <div class="post-footer">
      <button class="post-footer-btn">Like</button>
      <button class="post-footer-btn">Comment</button>

    </div>
    <div class="post-comments-section">
      <div class="comments">`
    })
    url="./backend/show-comments-of-post.php"
    data = {
      post_id: response0.data[i].id
    }
    axios({
      method: 'POST',
      url,
      params: data
    }).then(function (response2) {
      for (i = 0; i < response2.data.length; i++) {
        output +=`
        <div class="comment-container">
        <div class="comment-avatar">
          <img src="https://e7.pngegg.com/pngimages/10/446/png-clipart-roblox-corporation-doge-dog-breed-others-template-game.png" />
        </div>
        <div class="comment">
          <span> ${response2.data[i].full_name}</span>
          <span> ${response2.data[i].comment}</span>
        </div>
        </div>`
      }
      output +=`
      </div>
      <div class="my-comment-section">
        <div class="my-avatar">
          <img src="https://e7.pngegg.com/pngimages/10/446/png-clipart-roblox-corporation-doge-dog-breed-others-template-game.png" />
        </div>
        <div class="my-comment">
          <input class="my-comment-imput" />
        </div>
      </div>

    </div>
  </div>`

    })
  }
  posts.innerHTML += output
})