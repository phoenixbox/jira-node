/* add-on script */
$(function() {
 AP.define('WebhookForm', {

    submitForm: function(event) {
      // Extract the JWT token and other params
      var qs = document.location.search;
      qs = qs.split("+").join(" ");

      var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

      while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] =
          decodeURIComponent(tokens[2]);
      }

      AP.require('request', function(request) {
        request({
          url: '/rest/webhooks/1.0/webhook',
          type: 'POST',
          headers: {"X-Atlassian-Token": "nocheck"},
          data: {
            "name": "webhook",
            "url": "http://requestb.in/1eivz7v1",
            "events": ["jira:issue_created"],
            "jqlFilter": "Project = JRA AND resolution = Fixed",
            "excludeIssueDetails": false
          },
          success: function(responseText){
            alert( "Success" + responseText );
          },
          error: function() {
            alert( "Error" + arguments );
          }
        });
      });
    }

 });

  AP.require('WebhookForm', function(WebhookForm) {
    $('#create-webhook').click(function( event ) {
      event.preventDefault();
      WebhookForm.submitForm();
    });
  });
});