function sendAjaxRequest(element,urlToSend) {
     var clickedButton = element;
      $.ajax({type: "POST",
          url: urlToSend,
          data: { btn: clickedButton.val(), id: $("#access_token").val(), plannerId: $("#planner").val() },
          success:function(result){
            // alert('ok');
            window.location.replace('http://localhost:8080/activityPlanned')
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
      sendAjaxRequest($(this),'http://localhost:8080/chat');
  });

  $("#button_2").click(function(e){
      e.preventDefault();
      sendAjaxRequest($(this),'http://localhost:8080/chat');
  });
});