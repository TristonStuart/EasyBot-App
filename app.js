const opn = require('opn'); //Opn to open browser
const express = require('express') //Express for webserver
const app = express(); //Initialize express

app.use('/files',express.static('./APP_PATH/FILES'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/APP_PATH/check.html');
});

app.listen(800, () => {
    console.log('App listening on port 800 ; Launching chrome...')
});

// Start Google Chrome with url
const { exec } = require('child_process'); // Get child process
const bat = exec(`START chrome 127.0.0.1:800 --app="data:text/html,<html><body><script>window.moveTo(580,240);window.resizeTo(800,600);window.location='http://127.0.0.1:800';</script></body></html>"`) // Start Chrome

bat.on('exit', (code) => {
  if (code == 0){
      console.log('Chrome launched...'); // Chrome launched
  }else {
      console.log('ERROR || Chrome is not installed, please install Google Chrome') //Chrome not found
  }
});
