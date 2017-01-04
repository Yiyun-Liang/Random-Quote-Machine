var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

var quote = '';
var author = '';

function inIframe(){
  try{
    return window.self !== window.top;
  }catch(e){
    return true;
  }
}

function getNewQuote(){
  $.ajax({
    url: "http://api.forismatic.com/api/1.0/?",
    dataType: "jsonp",
    data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
    success: function(res){
      console.log(res);
      //var jsonRes = JSON.parse(res);
      //var post = jsonRes.shift();
      quote = res.quoteText;
      author = res.quoteAuthor;

      if(inIframe()){
        $("#tweet-quote").attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote + '" ' + author));
      }

      $(".quote").animate({
        opacity: 0
      }, 500, function(){
        $(this).animate({
          opacity: 1
        }, 500);
        $("#text").html(quote);
      });

      $(".quote-author").animate({
        opacity: 0
      }, 500, function(){
        $(this).animate({
          opacity: 1
        }, 500);
        $("#author").text(author);
      });

      var color = Math.floor(Math.random() * colors.length);

      $("html body").animate({
        backgroundColor: colors[color],
        color: colors[color]
      }, 1000);

      $("button").animate({
        backgroundColor: colors[color]
      }, 1000);

    }
  });
}

function openUrl(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function tweetQuote(){
  if(!inIframe()) {
    openUrl('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote + '" ' + author));
  }
}

$(document).ready(function(){
  getNewQuote();
  $(".new-quote").on('click', getNewQuote);
  $(".tweet-quote").on('click', tweetQuote);
});
