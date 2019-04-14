// set "GOOGLE_APPLICATION_CREDENTIALS=./image_recog-894439ab6fff.json"
const express = require('express');
const uuidv4 = require('uuid/v4');
const axios = require('axios');
const formidableMiddleware = require('express-formidable');
const app = express();
const fs = require('fs');
const path = require('path')
const vision = require('@google-cloud/vision');
const bodyParser = require('body-parser');  
const url = require('url');  
const querystring = require('querystring');  

app.use(formidableMiddleware());
app.use('/img', express.static(path.join(__dirname, 'img')))
// app.use(express.static('../dist')) // when ~deploy


app.get('/', (req, res) => {
  return res.send('brainsnapapi: /');
});

async function quickstart(path) {
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.labelDetection(path);
  console.log(result)
  return result;
}

app.get('/getfoodinfo', async (req, res) => {
  let label = req.query.label;
  if (label && label !== '') {
    const apiurl = `https://api.edamam.com/api/food-database/parser?ingr=${encodeURIComponent(label)}&app_id=dacb9331&app_key=11135c95656912ac0149d761a2bc4071`
    return res.send((await axios.get(apiurl)).data)
  } else {
    return res.status(400).send('No label was provided.');
  }
})

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

app.get('/getexistingpicinfo', async (req, res) => {
  let uuid = req.query.uuid;
  if (uuid && uuid !== '') {
    const name = `img/${uuid}`
    const apiurl = `https://api.edamam.com/api/food-database/parser?ingr=${encodeURIComponent(name)}&app_id=dacb9331&app_key=11135c95656912ac0149d761a2bc4071`
    let ret = await quickstart(name);

    return res.send({
      name: name,
      value: ret
    });
  } else {
    return res.status(400).send('No label was provided.');
  }
})

// 

app.get('/getpics', (req, res) => {
  const files = fs.readdirSync('img/');
  return res.send(files);
});



app.listen(3000, () =>
  console.log(`brainsnapapi listening on port 3000!`),
);