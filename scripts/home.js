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
    output = ``
    output += `
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
}).then(async function (response0) {
  output = ""
  for (i = 0; i < response0.data.length; i++) {
    user_name = response0.data[i].full_name
    output += `
    <div class="post">
    <p style="display:none">${response0.data[i].id}</p>
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
      </div>
    </div>
   

    <div class="post-content">
    <span> ${response0.data[i].text}</span>
    <img src="https://a.cdn-hotels.com/gdcs/production180/d1647/96f1181c-6751-4d1b-926d-e39039f30d66.jpg?impolicy=fcrop&w=800&h=533&q=medium" />
    </div>`
    data = {
      post_id: response0.data[i].id,
    }
    url = "./backend/show-post-likes.php"
    data = {
      post_id: response0.data[i].id
    }
    await axios({
      method: 'POST',
      url,
      params: data
    }).then(function (response1) {
      output += `
      <div class="post-likes">
      <span>${response1.data[0].likes}`
    })
    url = "./backend/check-likes.php"
    data = {
      post_id: response0.data[i].id,
      user_id: localStorage.getItem("user_id")
    }
    await axios({
      method: 'POST',
      url,
      params: data
    }).then(function (response) {
      if (response == 1) {
        output += `
        <img class="collapse"></span>
    </div>
    <div class="post-footer">
      <button class="post-footer-btn likes">Like</button>
      <button class="post-footer-btn">Comment</button>

    </div>
    <div class="post-comments-section">
      <div class="comments">`
      }
      else {
        output += `
        <img class="expand"></span>
    </div>
    <div class="post-footer">
      <button class="post-footer-btn likes">Like</button>
      <button class="post-footer-btn">Comment</button>

    </div>
    <div class="post-comments-section">
      <div class="comments">`
      }
    })
    url = "./backend/show-comments-of-post.php"
    data = {
      post_id: response0.data[i].id
    }
    await axios({
      method: 'POST',
      url,
      params: data
    }).then(function (response2) {
      for (k = 0; k < response2.data.length; k++) {
        output += `
        <div class="comment-container">
        <div class="comment-avatar">
          <img src="https://e7.pngegg.com/pngimages/10/446/png-clipart-roblox-corporation-doge-dog-breed-others-template-game.png" />
        </div>
        <div class="comment">
          <span> ${response2.data[k].full_name}</span>
          <span> ${response2.data[k].comment}</span>
        </div>
        </div>`
      }
      output += `
      </div>
      <div class="my-comment-section">
        <div class="my-avatar">
          <img src="https://e7.pngegg.com/pngimages/10/446/png-clipart-roblox-corporation-doge-dog-breed-others-template-game.png" />
        </div>
        <div class="my-comment">
          <input class="my-comment-imput comments" />
        </div>
      </div>

    </div>
  </div>`

    })
  }
  posts.innerHTML += output
  comments = document.getElementsByClassName("comments")
  for (i = 0; i < comments.length; i++) {
    comments[i].addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        user_id = localStorage.getItem("user_id")
        post_id = event.currentTarget.parentElement.parentElement.parentElement.parentElement.firstElementChild.innerHTML
        text = event.currentTarget.value
        data = {
          user_id,
          text,
          post_id
        }
        url = "./backend/comment.php"
        axios({
          method: 'POST',
          url,
          params: data
        }).then(function (response) {
          console.log(response)
        }
        )
      }
    });}
  likes = document.getElementsByClassName("likes")
  for (j = 0; j < likes.length; j++) {
      likes[j].addEventListener("click", function (e) {
        data ={
          post_id: e.currentTarget.parentElement.parentElement.parentElement.parentElement.firstElementChild.innerHTML,
          user_id: localStorage.getItem("user_id")
        }
        url = "./backend/like.php"
        axios({
          method: 'POST',
          url,
          params: data
        }).then(function (response) {
          console.log(response)
        })
        e.currentTarget.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.nextElementSibling.remove("expand")
        e.currentTarget.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.nextElementSibling.add("collapse")
      })

      likes[j].addEventListener("click", function (e) {
        data ={
          post_id: e.currentTarget.parentElement.parentElement.firstChild.nextElementSibling.innerHTML,
          user_id: localStorage.getItem("user_id")
        }
        url = "./backend/like.php"
        axios({
          method: 'POST',
          url,
          params: data
        }).then(function (response) {
        })
        e.currentTarget.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.nextElementSibling.remove("collapse")
        e.currentTarget.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.nextElementSibling.add("expand")
      })
  }
});
