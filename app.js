const express = require('express')
const app = express()
const port = 8080
app.use(express.json());
const env = require('dotenv').config();
const fs = require('fs');

app.get('/foo', (req, res) => {
    res.send('Assignment 3s barz?!')
})

app.post('/hello', (req, res) => {
    res.send("Hello " + req.body.name + "!")
})

app.get('/kill', (req, res) => {
    console.log("Shutting down...")
    server.close();
    res.send("goodbye!")
})

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.get('/configValue', (req, res) => {
    res.send(process.env.config_value);
    console.log(process.env.config_value);
})

app.get('/secretValue', (req, res) => {
    res.send(process.env.secret_value);
    console.log(process.env.secret_value);
})

app.get('/envValue', (req, res) => {
    res.send(process.env.env_value);
    console.log(process.env.env_value);
})

app.post('/saveString', (req, res) => {
    const content = req.body.data
    console.log(content)
    fs.writeFile('/mnt/test.txt', content, err => {
        if (err) {
            console.error(err);
            res.send("Could not save data.")
        }else{
            res.send("Saved data");
        }
    });
})

app.get('/getString', (req, res) => {
    //read from file to extract the string else return line below:
    fs.readFile('/mnt/test.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(404).send("File not found!");
          return;
        }else{
            res.send(data);
            console.log(`Read data from file successfully, data is ${data}`);
        }
      });
})

app.get('/busywait', (req, res) => {
    let eatingCPU = 123131 * 231 / 2 * 934
    let startTime = Date.now();
    console.log(startTime)
    while ((Date.now() - startTime) < 180000){
        console.log(eatingCPU);
    }
    console.log(Date.now())
})

app.get('/isAlive', (req, res) => {
      res.status(200).send("true");
})