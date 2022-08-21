/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet in tweets) {
    let $tweet = createTweetElement(tweets[tweet]);
    $('#tweets-container').prepend($tweet);
  }
}

const createTweetElement = function(tweet) {
  let $tweet = `  
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
  return $tweet
}

renderTweets(data);
