function sendAjaxRequest(element,urlToSend) {
     var clickedButton = element;
      $.ajax({type: "POST",
          url: urlToSend,
          data: { btn: clickedButton.val(), id: $("#access_token").val(), plannerId: $("#planner").val() },
          success:function(result){
            // alert('ok');
            window.location.replace("https://frozen-waters-55312.herokuapp.com/index" || 'http://localhost:8080/index')
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
      sendAjaxRequest($(this), "https://frozen-waters-55312.herokuapp.com/chat" || 'http://localhost:8080/chat');
  });

  $("#button_2").click(function(e){
      e.preventDefault();
      sendAjaxRequest($(this), "https://frozen-waters-55312.herokuapp.com/chat" || 'http://localhost:8080/chat');
  });
});