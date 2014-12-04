var service = require('../services/service');

module.exports = function (app, addon) {
  // Root route. This route will serve the `atlassian-connect.json` unless the
  // documentation url inside `atlassian-connect.json` is set
  app.get('/', function (req, res) {
      res.format({
          // If the request content-type is text-html, it will decide which to serve up
          'text/html': function () {
              res.redirect('/atlassian-connect.json');
          },
          // This logic is here to make sure that the `atlassian-connect.json` is always
          // served up when requested by the host
          'application/json': function () {
              res.redirect('/atlassian-connect.json');
          }
      });
  });

  // Add any additional route handlers you need for views or REST resources here...
  app.get('/mission-control', addon.authenticate(), function(req, res) {
    console.log('WTF');
    res.render('webhooks', { title: "Launchpad" });
  });

  app.post("/addon/enabled", function (req, res) {
    console.log("POSTING TO: /addon/enabled");
  });

  app.post("/rest/api/1.0/issue", function (req, res) {
    console.log("POSTING TO: /rest/api/1.0/issue");
  });
};
