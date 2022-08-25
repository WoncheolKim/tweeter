const escaper = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready(function() {
  //all of the code here


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
      <p>${escaper(tweetData.content.text)}</p>
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

const loadTweets = function () {
  $("#new-tweet").slideUp("fast");
  $.ajax({
    method: "GET",
    url: "/tweets",
    success: (response) => {
      console.log(response);
      renderTweets(response.reverse());
    },
    error: (error) => {
      console.log(error);
    }
});
};

$('#submitTweet').submit(function(event) {
  event.preventDefault();
  const textData = $(this).serialize();
  const tweetLength = $('#tweet-text').val().length;
  if (tweetLength === 0) {
    $("#alertMessage").slideDown("slow", creatAlertMessage("emptyAlert"));
  } else {
    if (tweetLength > 140) {
      $("#alertMessage").slideDown("slow", creatAlertMessage("lengthAlert"));
    } else {
      $('#tweet-text').val("");
      $('#counter').val('140');
      $.ajax({
        method: "POST",
        url: "/tweets/",
        data: textData,
        success: () => {
          loadTweets();
          alert('succssfulypostedtweet');
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
});

const creatAlertMessage = function(message) {
  $("#alertMessage").empty();
  if (message === "emptyAlert") {
    const alert = `<i class="fa-solid fa-triangle-exclamation"></i>
    Tweet contents should not be empty.
      <i class="fa-solid fa-triangle-exclamation"></i>`;
    $("#alertMessage").append(alert);
  }

  if (message === "lengthAlert") {
    const alert = `<i class="fa-solid fa-triangle-exclamation"></i>
    Too long. Tweet contents should not exceed 140 letters.
      <i class="fa-solid fa-triangle-exclamation"></i>`;
    $("#alertMessage").append(alert);
  }
};

const renderTweets = function(tweets) {
  console.log("renderingtweet")
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
}

$('#tweet-text').click(() => {
  $("#alertMessage").empty();
  $("#alertMessage").slideUp("fast");
});

$("#navAngleIcon").click(function() {
  $("#new-tweet").slideToggle("slow");
  $("#tweet-text").focus();
});

$(window).scroll(function() {
  console.log($(document).scrollTop())
  if ($(document).scrollTop() > 500) {
    $("#scrollUpButton").css("display", "block");
  } else {
    $("#scrollUpButton").css("display", "none");
  }
});

$("#scrollUpButton").on("click", function() {
  $(document).scrollTop(0);
});

});