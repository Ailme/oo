"use strict";

const server = require(__dirname + "/server/index");

if (!module.parent) {
  console.log('Server running on ' + server.config.env);
  server.app.listen(server.config.port || 3000, function () {
    console.log('Server running on port ' + server.config.port || 3000)
  })
} else {
  module.exports = server.app
}
