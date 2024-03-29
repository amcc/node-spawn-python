// use python to do the grunt work
// but node to do the smart stuff

var spawn = require("child_process").spawn;
var process = spawn("python", ["python.py"]);

process.stdout.on("data", function(chunk) {
  var textChunk = chunk.toString("utf8"); // buffer to string
  
  // preserve newlines, etc - use valid JSON
  s = textChunk
    .replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
  // remove non-printable and other non-valid JSON chars
  s = s.replace(/[\u0000-\u0019]+/g, "");

  // turn it into JSON
  var json = JSON.parse(s);

  console.log(json);
});
