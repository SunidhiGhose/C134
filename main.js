video = "";
alrm = "";
status = "";
objects = [];
function setup(){
    alrm = loadSound('alarm.mp3');
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objDctr = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting";
}
function modelLoaded(){
    console.log("model loaded!");
    console.log(ml5.version);
    status = true;
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;

    }
}
function draw(){
    image(video,0,0,380,380);
    if(status != ''){
        objDctr.detect(video, gotResult);
        for(i = 0; i< objects.length; i++){
            document.getElementById('status').innerHTML = "Status: Object Detected";
            if(objects[i].label == "person"){
                alrm.stop();
                document.getElementById('baby').innerHTML = "Baby Found!";
                fill('#033');
                percent = floor(objects[i].confidence * 100);
                textSize(23);
                text(objects[i].label + " " + percent + "%" , objects[i].x +15, objects[i].y + 20);
                noFill();
                stroke('#033');
                rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height); 
            }
            else{
                alrm.loop();
                document.getElementById('baby').innerHTML = "Baby Not Found!";
            }
        }
    }

}