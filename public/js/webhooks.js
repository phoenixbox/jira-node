/* add-on script */
$(function() {

 AP.define('WebhookForm', {
    submitForm: function(event) {

      // Extract the JWT token and other request params
      var qs = document.location.search;
      qs = qs.split("+").join(" ");

      var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

      while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }

      var base64auth = window.btoa(unescape(encodeURIComponent("shane")));

      var issueData = {
        "fields": {
           "project":
           {
              "id": "10000"
           },
           "summary": "No REST for the Wicked.",
           "description": "Creating of an issue using ids for projects and issue types using the REST API",
           "issuetype": {
              "id": "3"
           }
        }
      }

      var webhookData = {
        "name": "webhook",
        "url": "http://requestb.in/1eivz7v1",
        "events": ["jira:issue_created"],
        "jqlFilter": "Project = JRA AND resolution = Fixed",
        "excludeIssueDetails": false
      }

      // var url = params.xdm_e + params.cp + "/rest/api/1.0/issue";
      var url = params.xdm_e + params.cp + "/rest/webhooks/1.0/webhook";

      // ***** jQuery jsonp attempt *****
      $.ajax({
        type: "POST",
        url: url,
        data: webhookData,
        contentType : "application/json",
        success: function(data, textStatus, jqXHR) {
          console.log("success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("failure");
        },
        dataType: 'jsonp'
      });

      // ***** Issue Create Attempt *****
      // AP.require('request', function(request) {
      //   debugger
      //   console.log('making request');
      //   request({
      //     url: '/rest/api/1.0/issue',
      //     type: 'POST',
      //     headers: {Authorization: "JWT "},
      //     data: {
      //       "fields": {
      //          "project":
      //          {
      //             "id": "10000"
      //          },
      //          "summary": "No REST for the Wicked.",
      //          "description": "Creating of an issue using ids for projects and issue types using the REST API",
      //          "issuetype": {
      //             "id": "3"
      //          }
      //       }
      //     },
      //     success: function(responseText){
      //       console.log("Success" + responseText);
      //     },
      //     error: function() {
      //       console.log("Error" + arguments);
      //     }
      //   });
      // });

      // ***** Webhook Create Attempt *****
      // AP.require('request', function(request) {
      //   request({
      //     url: '/rest/webhooks/1.0/webhook',
      //     type: 'POST',
      //     headers: {"X-Atlassian-Token": "nocheck"},
      //     data: {
      //       "name": "webhook",
      //       "url": "http://requestb.in/1eivz7v1",
      //       "events": ["jira:issue_created"],
      //       "jqlFilter": "Project = JRA AND resolution = Fixed",
      //       "excludeIssueDetails": false
      //     },
      //     success: function(responseText){
      //       alert( "Success" + responseText );
      //     },
      //     error: function() {
      //       alert( "Error" + arguments );
      //     }
      //   });
      // });
    }

 });

  AP.require('WebhookForm', function(WebhookForm) {
    $('#create-webhook').click(function( event ) {
      event.preventDefault();
      WebhookForm.submitForm();
    });
  });
});