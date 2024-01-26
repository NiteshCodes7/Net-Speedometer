let startTime, endTime;
let imageSize = "";
let image = new Image();
let buttn = document.getElementById("btn"),
    bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed, totalKbSpeed, totalMbSpeed, timeDuration, loadedBits, speedInBts, speedInKbs, speedInMbs, averageSpeedInBps, averageSpeedInKbps, averageSpeedInMbps = 0;
let numTests = 3;
let testCompleted = 0;
let a = 0;

buttn.addEventListener('click', () =>{
    if(buttn.innerHTML == "Start"){
        buttn.onclick = () =>{
            a = 0;
        }
    if(buttn.innerHTML=="Start" && a == 0){
    init();
    bitSpeed.innerHTML = "";
    kbSpeed.innerHTML = "";
    mbSpeed.innerHTML = "";
    testCompleted = 0;
    timeDuration = 0;
    loadedBits = 0;
    speedInBts = 0;
    speedInKbs = 0;
    speedInMbs = 0;
    averageSpeedInBps = 0;
    averageSpeedInKbps = 0;
    averageSpeedInMbps = 0;
    totalBitSpeed = 0;
    totalKbSpeed = 0;
    totalMbSpeed = 0;
};
}
})

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
    timeDuration = (endTime - startTime) / 1000;
    loadedBits = imageSize * 8;
    speedInBts = loadedBits / timeDuration;
    speedInKbs = speedInBts / 1024;
    speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    if(testCompleted === numTests){
        averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        bitSpeed.innerHTML = `${averageSpeedInBps}`;
        kbSpeed.innerHTML = `${averageSpeedInKbps}`;
        mbSpeed.innerHTML = `${averageSpeedInMbps}`;
        info.innerHTML = "Test Completed!";
        a = 1;

    }else{
        init();
    }

    if(a == 1){
        buttn.innerHTML = "Reset";
        if(buttn.innerHTML == "Reset"){
            buttn.addEventListener('click', ()=>{
                bitSpeed.innerHTML = "";
                kbSpeed.innerHTML = "";
                mbSpeed.innerHTML = "";
                info.innerHTML = "...";
                buttn.innerHTML = "Start";
            })
        }
    }
}
