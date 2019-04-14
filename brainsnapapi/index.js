const express = require('express');
const uuidv4 = require('uuid/v4');
const formidableMiddleware = require('express-formidable');
const app = express();
app.use(formidableMiddleware());


app.get('/', (req, res) => {
  return res.send('brainsnapapi: /');
});

async function quickstart(path) {
  const vision = require('@google-cloud/vision');
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.labelDetection(path);
  console.log(result)
  return result;
}

app.post('/postpic', async (req, res) => {
  if (req.files && req.files.imageupload) {
    // return res.send(uuidv4());
    let ret = await quickstart(req.files.imageupload.path);
    return res.send(ret);
  } else {
    return res.status(400).send('No files were uploaded.');
  }


});

// app.post('/', (req, res) => {
//   return res.send('Received a POST HTTP method');
// });

// app.put('/', (req, res) => {
//   return res.send('Received a PUT HTTP method');
// });

// app.delete('/', (req, res) => {
//   return res.send('Received a DELETE HTTP method');
// });

app.listen(3000, () =>
  console.log(`brainsnapapi listening on port 3000!`),
);