let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 3;
let testCompleted = 0;

window.onload = () =>{
    init();
};

const init = async () =>{
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

let imageApi = "https://source.unsplash.com/random?topic=nature";
image.onload = async () => {
    endTime = new Date().getTime();

    await fetch(imageApi).then(response => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    })
}

function calculateSpeed(){
    let timeDuration = (endTime - startTime) / 1000;
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    if(testCompleted === numTests){
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbps}`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}`;
        info.innerHTML = "Test Completed!";
    }else{
        init();
    }
}

