function sendAjaxRequest(element,urlToSend) {
     var clickedButton = element;
      $.ajax({type: "POST",
          url: urlToSend,
          data: { id: clickedButton.val(), access_token: $("#access_token").val() },
          success:function(result){
            alert('ok');
          },
         error:function(result)
          {
          alert('error');
         }
     });
}

$(document).ready(function(){
  $("#button_1").click(function(e){
      e.preventDefault();
      sendAjaxRequest($(this),'http://localhost:8080/activitystatus');
  });

  $("#button_2").click(function(e){
      e.preventDefault();
      sendAjaxRequest($(this),'http://localhost:8080/activitystatus');
  });
});

        /*// Part 2: Bandwidth optimization
        // Modify your form again so that AJAX requests happen at most once every 300 milliseconds. 
        var firstTime = Date.now()

        function sugg(typedIn){
            var secondTime = Date.now()
            var timePassed = secondTime - firstTime
            if(timePassed < 300){
                //do nothing
            }
            else{
                $.post('/suggestionFinder',{typedIn: typedIn}, function(data,status){
                    $('#suggestedName').text(data)
                })  
            }
            firstTime = secondTime // Every time a button is pressed firstTime will take the value of the secondTime        
            console.log('firstTime')
            console.log(firstTime)
            console.log('secondTime')
            console.log(secondTime) 
            console.log('timePassed')
            console.log(timePassed)
        }*/
/*$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $( "#chat_window_1" ).remove();
});
*/