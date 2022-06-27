let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function distanceHands (x, y, diam) {
  fill(255,135,0);
 strokeWeight(2);
 ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
 ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
 strokeWeight(10);
 stroke(10);
 fill(0,90,255);
}

function draw() {
  image(video, 0, 0);
  if (pose) {
    let shoulderR = pose.rightShoulder;
    let shoulderL = pose.leftShoulder;
    let wristL = pose.leftWrist;
    let wristR = pose.rightWrist;

    if (wristL.confidence > 0.1 || wristR.confidence > 0.1){
      if (wristL.y < shoulderL.y && wristR.y < shoulderR.y){
        distanceHands(pose.rightEye.y, pose.rightEye.x, 170);
      }
    }
  }
}
