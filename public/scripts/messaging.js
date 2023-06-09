

function getAllMessages(threadId) {
  return $.ajax({
    method: 'GET',
    url: '/api/getAllMessagesApi',
    data: { id: threadId },
  })
    .then((messages) => {
      console.log("this is ajax", messages);
      const $messageList = $('#messageHistory');
      $messageList.empty();

      for (const message of messages) {
        console.log(message);
        $messageList.append(populateMessages(message));
      }

      $('#messageText').val('');
    })
    .catch((error) => {
      console.error("AJAX request failed:", error);
    });
}
function populateMessages(message) {
  var $message = $(
    `<section>
      <p><strong>Sender Name:</strong> ${message.name}</p>
      <p><strong> date:</strong> ${message.created_at}</p>
      <p><strong>thread:</strong> ${message.thread_id}</p>
      <p><strong>Message Text:</strong> ${message.message}</p>
    </section>`
  );
  return $message;
}
$(() => {
  getAllMessages(1);
  $('#message-form').on('submit', (event) => {
    event.preventDefault();
    console.log("ajax request");
    const data = $('#message-form').serialize();
    $.ajax({
      method: 'POST',
      url: '/api/messaging',
      data: data
    }).then(function () {
      getAllMessages(1); //change this to thread id from the user threads
    });
  })
});




