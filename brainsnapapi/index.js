// set "GOOGLE_APPLICATION_CREDENTIALS=./image_recog-894439ab6fff.json"
const express = require('express');
const uuidv4 = require('uuid/v4');
const formidableMiddleware = require('express-formidable');
const app = express();
const fs = require('fs');
const path = require('path')

app.use(formidableMiddleware());
app.use('/img', express.static(path.join(__dirname, 'img')))
// app.use(express.static('../dist')) // when ~deploy


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
    const name = `img/${uuidv4()}`
    fs.copyFile(req.files.imageupload.path, name, (err) => {
      if (err) throw err;
      console.log(`${req.files.imageupload.path} was copied to ${name}`);
    });
    let ret = await quickstart(name);

    return res.send({
      name: name,
      value: ret
    });
  } else {
    return res.status(400).send('No files were uploaded.');
  }
});

app.get('/getpics', (req, res) => {
  const files = fs.readdirSync('img/');
  return res.send(files);
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