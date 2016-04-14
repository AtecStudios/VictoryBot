var Discord = require("discord.js");
var Learn = require('./learn.js');
var Audio = require('./audio.js');

var mybot = new Discord.Client();
var Commands = [];

Audio.OnComplete = function(){
  console.log("COMPLETE AUDIO LOAD");
  for (var i = 0; i < Audio.AudioFiles.length; i++) {
    var Current = Audio.AudioFiles[i];
    var newCommand = {
      cmd: Current.command,
      run: playAudio
    };

    Commands.push(newCommand);
  }
}

Commands.push({cmd:"!list", run:list})
Commands.push({cmd:"!stop", run:stopAudio})
mybot.on("ready", function(){

});

mybot.on("message", function(message){
  var channel = message.channel;
  console.log("[OnMessage] Got Message: " + message.content + " in "+ channel);
  runCommand(message, channel);
});

mybot.on("voiceJoin", function(channel, user){
  if(user.username == "VictoryForPhil"){
    mybot.joinVoiceChannel(channel);
  }
});

mybot.on("voiceLeave", function(channel, user){
  if(user.username == "VictoryForPhil"){
    mybot.leaveVoiceChannel(channel);
  }
});

mybot.loginWithToken("MTcwMDIwODA3MTk4NjM4MDgw.CfCntw.lUVQYtFJ-Jh2flq0-TXRUImjkZw")

function runCommand(cmd, server) {
  for (var i = 0; i < Commands.length; i++) {
    var currentCMD = Commands[i];
    console.log(currentCMD);
    if(currentCMD.cmd.includes(cmd)){
      currentCMD.run(cmd, server);
    }
  }
}


function playAudio(cmd) {

  for (var i = 0; i < Audio.AudioFiles.length; i++) {
      var clip = Audio.AudioFiles[i];
      if(cmd == clip.command){
        console.log("Playing Audio");
        console.log(clip);
        mybot.voiceConnections[0].playFile("./audio/" + clip.file, 1);
      }
    }
}

function list(cmd, server) {
  for (var i = 0; i < Commands.length; i++) {
    mybot.sendMessage(server, Commands[i].cmd + ' ');
  }
}
function stopAudio(cmd) {
  mybot.voiceConnection.stopPlaying();
}
