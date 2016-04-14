var Learned = [];

function NewMessage(msg){

}

function AlreadyRegistered(msg) {
  for(var i=0;i<Learned.length;i++){
    var Current = Learned[i];


  }
}

function extractWords(raw) {
   var wordCount = raw.replace(/[^ ]/g, "").length + 1;
   var words = [];
   var currentIndex = 0;
   for (var i = 0; i < wordCount; i++) {
     var SpaceIndex = raw.indexOf(" ", currentIndex);
     var word = raw.substring(currentIndex, SpaceIndex);
     console.log(word);
     currentIndex = SpaceIndex + 1;
   }

}

module.exports.extractWords = extractWords;
