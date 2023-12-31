var $messages = $('.messages-content'),
      d, h, m,
      i = 0;

$(window).load(function () {
      $messages.mCustomScrollbar();
});

function updateScrollbar() {
      $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
            scrollInertia: 10,
            timeout: 0
      });

}
function setDate() {
      d = new Date();
      if (m != d.getMinutes()) {
            m = d.getMinutes();
            $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
      }
}

function insertMessage() {
      msg = $('.message-input').val();
      if ($.trim(msg) == '') {
            return false;
      }
      $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
      setDate();
      updateScrollbar();
      sendMessage();
      $('.message-input').val('');
}

$('.message-submit').click(function () {
      insertMessage();
});

$(window).on('keydown', function (e) {
      if (e.which == 13) {
            insertMessage();
            return false;
      }
});


function sendMessage() {
      $('<div class="message loading new"><figure class="avatar"><img src="https://filesstatic.netlify.app/ChatBotAi/static/chatbot.png"/ alt="chatbot"></figure><span></span></div>').appendTo($('.mCSB_container'));
      updateScrollbar();
      var userMessage = $('#user-message').val();
      $.ajax({
            type: 'POST',
            url: '/chat_view/',
            data: { message: userMessage },
            success: function (data) {
                  var aiResponse = data.response;
                  console.log(aiResponse);
                  setTimeout(function () {
                        $('.message.loading').remove();
                        $('<div class="message new"><figure class="avatar"><img src="https://filesstatic.netlify.app/ChatBotAi/static/chatbot.png"/ alt="chatbot"></figure>' + aiResponse + '</div>').appendTo($('.mCSB_container')).addClass('new');
                        setDate();
                        updateScrollbar();
                        i++;
                  });
            },
            error: function () {
                  $('.message.loading').remove();
                  $('<div class="message new"><figure class="avatar"><img src="https://filesstatic.netlify.app/ChatBotAi/static/chatbot.png"/ alt="chatbot"></figure>' + "Failed to get AI response." + '</div>').appendTo($('.mCSB_container')).addClass('new');
                  setDate();
                  updateScrollbar();
                  i++;
                  console.log('Failed to get AI response.');
            }
      });
}
