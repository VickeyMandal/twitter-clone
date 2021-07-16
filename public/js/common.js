//To refresh tweets
async function refreshTweets() {

//allTweets: Id of ul in main-layout.js
  $("#allTweets").empty();

  const tweets = await axios.get("/api/post");

  for (let post of tweets.data) {
    $("#allTweets").append(`<li>${post.content} by ${post.postedBy} </li>`);
  }
}

refreshTweets();

//submitPostButton: Id of Button in main-layout.js
//post-text: Id of text area in main-layout.js
$("#submitPostButton").click(async () => {
  const postText = $("#post-text").val();
  console.log(postText);

  //AJAX requst to submit post
  const newPost = await axios.post("/api/post", { content: postText });
  console.log(newPost);
  //After creating new tweet it refresh all tweets
  refreshTweets();

  $("#post-text").val("");
});
