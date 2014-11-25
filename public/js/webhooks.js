/* add-on script */
$(function() {

 AP.define('WebhookForm', {
    buildWebhookForm: function() {
      var form = ["<form class='aui'>",
                "<div class='field-group'>",
                    "<label for='comment-email'>Email <span class='aui-icon icon-required'>(required)</span></label>",
                    "<input class='text medium-field' type='text' id='comment-email' name='comment-email' placeholder='you@example.com'>",
                    "<div class='description'>Your primary email address.</div>",
                "</div>",
                "<div class='field-group'>",
                    "<label for='comment-input'>Comment</label>",
                    "<textarea class='textarea' name='comment-input' id='comment-input' placeholder='Your comment here...'></textarea>",
                "</div>",
                "<div class='buttons-container'>",
                    "<div class='buttons'>",
                        "<input class='button submit' type='submit' value='Save' id='comment-save-button'>",
                        "<a class='cancel' href='#'>Cancel</a>",
                    "</div>",
                "</div>",
            "</form>"]
      from = form.join("\n")
      $('.webhooks').html(form);
      console.log('build the webhook form');
    }
 });

 AP.require('WebhookForm', function(WebhookForm) {
    WebhookForm.buildWebhookForm();
 });

});