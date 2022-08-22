/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetData) {
  return `  
    <article>
      <header>
        <div>
        <img src=${tweetData.user.avatars} alt="profile icon">
          <p class="person-name">${tweetData.user.name}</p>
        </div>
        <div>${tweetData.user.handle}</div>
      </header>
      <p>${tweetData.content.text}</p>
      <footer class="tweet-footer">
        <div >${timeago.format(tweetData.created_at)}</div>
        <div class="tweet-footer-right">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `
}

const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
}

const loadTweets = function () {
  $('#submitTweet').submit(function() {
    $.ajax({
      url: "/tweets",
      success: (response) => {
        renderTweets(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  });
};

$('#submitTweet').submit(function(event) {
  event.preventDefault();
  console.log($(this).serialize());
  const textData = $(this).serialize();
  $.ajax({
    method: "POST",
    url: "/tweets",
    data: textData,
    error: (error) => {
      console.log(error);
    }
  });
});

loadTweets();


// Test / driver code (temporary). Eventually will get this from the server.
const tweets = [{
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
},{
  "user": {
    "name": "Json",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@OurJson"
    },
  "content": {
      "text": "I qwrkwqeknte rkwenf"
    },
  "created_at": 1461116232227
}];

renderTweets(tweets);
