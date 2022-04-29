// Require Express.js
const express = require('express')
const app = express()

// get port
const args = require('minimist')(process.argv.slice(2));

const port = args.port || 5000;

//start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port));
});

function coinFlip() {
    let num = Math.random();
  
    if (num < 0.5)
    {
      return "heads";
    }
    else
    {
      return "tails";
    }
  }

function coinFlips(flips) {
let results = new Array(flips);
for (let i = 0; i < flips; i++)
{
    results[i] = coinFlip();
}
return results;
}

function countFlips(array) {
    let headscount = 0;
    let tailscount = 0;
  
    for (let i = 0; i < array.length; i++)
    {
      if (array[i] == "heads")
      {
        headscount++;
      }
      else
      {
        tailscount++;
      }
    }
    
    if (tailscount == 0)
    {
      return {heads: headscount};
    }
    else if (headscount == 0)
    {
      return {tails: tailscount};
    }
    return {heads: headscount, tails: tailscount};
  }

function flipACoin(call) {
const flip = coinFlip();
if (flip == call)
{
    return {call: call, flip: flip, result: "win"};
}
return {call: call, flip: flip, result: "lose"};
}  


app.get('/app/', (req,res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'});
        res.end(res.statusCode+ ' ' +res.statusMessage);
});

// Endpoint definition
app.get('/app/flip', (req,res) => {
    res.contentType('text/json');
    res.status(200).json({'flip' : coinFlip()});
});

app.get('/app/flips/:number', (req, res) => {
    res.contentType('text/json');
    const flips = coinFlips(req.params.number);
    const count = countFlips(flips);
    res.status(200).json({'raw':flips,'summary' : count});
});

app.get('/app/flip/call/heads', (req,res) => {
    res.contentType('text/json');
    res.status(200).json(flipACoin('heads'));
});

app.get('/app/flip/call/tails', (req,res) => {
    res.contentType('text/json');
    res.status(200).json(flipACoin('tails'));
});