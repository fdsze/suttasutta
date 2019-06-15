module.exports = function() {
  $('li.parent > .box > p > a').on('click', function(e){
    e.preventDefault();
    var $liparent = $(this).closest('li.parent');
    $liparent.data('switch', $liparent.data('switch') == 'expanded' ? 'collapsed' : 'expanded');

    if ($liparent.data('switch') == 'expanded') {
      $liparent.addClass('show');
      window.setTimeout(function(){
        if ($liparent.data('switch') == 'expanded') {
          $liparent.addClass('expanded');
        }
      }, 10);
    } else {
      $liparent.removeClass('expanded');
      window.setTimeout(function(){
        if ($liparent.data('switch') !== 'expanded') {
          $liparent.removeClass('show');
        }
      }, 500);
    }
  });
};