// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

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


function happyFace (x, y, diam) {
      // Face
      fill(255, 255, 0);
      stroke(0);
      strokeWeight(2);
      ellipse(x, y, diam, diam);
      
      // Smile
      var startAng = .1*PI
      var endAng = .9*PI
      var smileDiam = .6*diam;
      arc(x, y, smileDiam, smileDiam, startAng, endAng);
      
      // Eyes
      var offset = .2*diam;
      var eyeDiam = .1*diam;
      fill(0);
      ellipse(x-offset, y-offset, eyeDiam, eyeDiam);
      ellipse(x+offset, y-offset, eyeDiam, eyeDiam);
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
        happyFace(pose.rightEye.y, pose.rightEye.x, 170);
      }
    }
  }
}