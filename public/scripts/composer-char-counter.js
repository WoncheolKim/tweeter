$(document).ready( () => {
  $('textarea').on('input', function() {
    let leftLength = 140 - $(this).val().length;
    let counterValue = $(this).parent().find('output').text(leftLength);
    if (leftLength < 0) {
      console.log(leftLength)
      counterValue.addClass('counter-red')
    } else {
      counterValue.removeClass('counter-red')
    }
  })
});