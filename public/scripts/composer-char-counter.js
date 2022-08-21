$(document).ready( () => {
  $('textarea').on('input', function() {
    // This selects the input text and then finds its length
    let leftLength = 140 - $(this).val().length;
    // This selects the parent of the textarea (form) then finds the output tag with find()
      // ^that selects the node, to get the text you do .text()      
    let counterValue = $(this).parent().find('output').text(leftLength);
    
    if (leftLength < 0) {
      console.log(leftLength)
      counterValue.addClass('counter-red')
    } else {
      counterValue.removeClass('counter-red')
    }
  })
});