var play = false;
var soundFile;
var audioEventTimes = [];
var taskObject = {};


console.log('Script running');
//Wait till all content is loaded, could be external fonts scripts from other servers etc....
if (document.readyState != 'loading') {
    onDocumentReady();
} else {
    document.addEventListener('DOMContentLoaded', onDocumentReady);
}

// Page is loaded! Now event can be wired-up
function onDocumentReady() {
    console.log('Document ready.');

    playerControls();
    //getNewTime();
    var timer = setInterval(playSound, 5000);
}

function playerControls() {
    var playButton = document.getElementById('playButton');
    playButton.addEventListener("click", playSound);
    var stopButton = document.getElementById('stopButton');
    stopButton.addEventListener('click', stopSound);
}

var button = document.getElementById('addButton').addEventListener("click", getNewTime);


function getNewTime() {
        console.log("button clicked");
        for (i = 0; i < 6; i++){
          console.log(i);

        var newDay = document.getElementById('day'+i).value;
        var newHour = document.getElementById('hour'+i).value;
        console.log(newHour);
        var newMinute = document.getElementById('minute'+i).value;
        var taskName = document.getElementById('taskName'+i).value;
        console.log(taskName);
        console.log(newMinute);
        var currentDate = new Date();
        console.log(currentDate);
        var todayYear = currentDate.getFullYear();
        var todayMonth = currentDate.getMonth();
        var todayDay = currentDate.getDate();
        console.log(todayDay);
        var newAudioEventTime = new Date(todayYear, todayMonth, newDay, newHour, newMinute, 0);
        var unixTime = newAudioEventTime.getTime();
        taskObject = {
            taskName: taskName,
            unixTime: unixTime,
            played: false,
            sample: document.getElementById("dropDown"+i).value
        };
        console.log(taskObject);
        //  console.log(unixTime);
        audioEventTimes.push(taskObject);
        console.log(audioEventTimes);
        //    audioEventTimes.sort();

        audioEventTimes.sort(function(a, b) {
            return a.unixTime - b.unixTime;
        });
        console.log(audioEventTimes);
        // var newAudioEventTime = new Date()
        var taskList = document.getElementById("taskList");
        var addTasksToTaskList = document.createElement("div");
        addTasksToTaskList.id = taskObject.taskName;
        addTasksToTaskList.className += "tasks";
        var taskNameToTaskList = document.createElement("div");
        taskNameToTaskList.innerHTML = "Task: " + taskObject.taskName;
        addTasksToTaskList.appendChild(taskNameToTaskList);
        var taskTimeToTaskList = document.createElement("div");
        taskTimeToTaskList.innerHTML = "Time: " + newAudioEventTime;
        addTasksToTaskList.appendChild(taskTimeToTaskList);
        taskList.appendChild(addTasksToTaskList);
      }
}

function playSound() {
    console.log("soundEffect function is running");
    for (i = 0; i < audioEventTimes.length; i++) {
        var checkTime = Date.now();
        console.log(checkTime);
        var nextTime = (i + 1);
        console.log(audioEventTimes.length);
        console.log(nextTime);
        console.log(audioEventTimes[nextTime]);

if (i==audioEventTimes.length){
  var grabSourceAudioName = document.getElementById(audioEventTimes[i].sample);

if(checkTime > audioEventTimes[i].unixTime){
  if (audioEventTimes[i].played === false){
    grabSourceAudioName.play();
    console.log(grabSourceAudioName);
    audioEventTimes[i].played = true;
  }
}
}else{
if(checkTime > audioEventTimes[i].unixTime && checkTime < audioEventTimes[nextTime].unixTime){
  var grabSourceAudioName = document.getElementById(audioEventTimes[i].sample);

  if (audioEventTimes[i].played === false){
    grabSourceAudioName.play();
    console.log(grabSourceAudioName);
    audioEventTimes[i].played = true;
  }
}
}
}
/*
        if (checkTime > audioEventTimes[i].unixTime && checkTime < audioEventTimes[nextTime].unixTime) {
            console.log("time to play sound!");
            console.log(audioEventTimes[i]);
            console.log(audioEventTimes[i].sample);
            var grabSourceAudioName = document.getElementById(audioEventTimes[i].sample);
          //  var grabAudioElement = document.getElementById("audio");
          if (audioEventTimes[i].played === false) {   // used to play sample only once
            grabSourceAudioName.play();
            console.log(grabSourceAudioName);
            audioEventTimes[i].played = true;
          }
        }
    }
    */
}

function generateAudio() {
  if (audioEventTimes[i].played === false) {
      soundFile = document.createElement("audio");
      soundFile.id = 'audio' + i;
      console.log(soundFile.id);
      soundFile.preload = "auto";
      var src = document.createElement("source");
    //  src.src = "music/really.wav"; // enter name of mp3 here
      src.src = audioEventTimes[i].sample; // enter name of mp3 here
      soundFile.appendChild(src);
      soundFile.load();
      volume = soundFile.volume = 0.800000;
      soundFile.loop = false;
      soundFile.play();
      console.log("soundFile: ");
      console.log(soundFile);
      audioEventTimes[i].played = true;
  }
}

/*
function play() {
    if (play === false) {
        soundFile.currentTime = 0.01;
        soundFile.volume = volume;
    }
    play = true;
}
*/

function stopSound() {

  /*var grabSourceAudioName = document.getElementById(audioEventTimes[i].sample);
  grabSourceAudioName.pause();*/

  for (i = 0; i < audioEventTimes.length; i++) {
    var soundFileBajs = document.getElementById(audioEventTimes[i].sample);
    console.log(soundFile);
        soundFileBajs.pause();
      //  stopSoundFile.currentTime = 0;
   }
}
