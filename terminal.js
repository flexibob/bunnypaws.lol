const canvas = document.getElementById('terminal');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

//term sequence
const introLines = [
    "[terminal]: Gathering files...",
    "[terminal]: Files found: 1 985 948 394",
    "[terminal]: Breaching Firewall...",
];

const actionLines = [
    "C://Windows//System32//cmd.exe",
    "C://Users//Flexibob//Documents//file.txt",
    "C://Program Files//App//app.exe",
    "C://Temp//log.log",
    "C://Windows//explorer.exe",
    "D://Games//minecraft.exe",
    "C://Users//Public//Music//song.mp3"
];

const endMessages = [
    "[terminal]: Breach complete",
    "[terminal]: Access granted",
    "[terminal]: Operation finished",
];

let lines = [];
let lineHeight;
const bottomPadding = 10;
let maxLines;

// timings
let lastTime = 0;
let nextLineTime = 30; 
let stage = "intro";
let actionCounter = 0;

function getRandomSpeed() {
    return 50 + Math.random() * 300;
}

function draw(timestamp) {
    const fontSize = canvas.height * 0.045;
    lineHeight = canvas.height * 0.055;

    ctx.font = fontSize + 'px monospace';

    maxLines = Math.floor((canvas.height - bottomPadding) / lineHeight);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!lastTime) lastTime = timestamp;

    if (timestamp - lastTime > nextLineTime) {


        if (Math.random() < 0.05) {
            nextLineTime = 300 + Math.random() * 400;
            lastTime = timestamp;
        } else {
            lastTime = timestamp;

            let newLine = "";

            if (stage === "intro") {
                newLine = introLines.shift();
                if (!introLines.length) stage = "action";

            } else if (stage === "action") {
                if (Math.random() < 0.7) {
                    newLine = "[terminal]: " + actionLines[Math.floor(Math.random() * actionLines.length)];
                } else {
                    newLine = "";
                }

                actionCounter++;

                if (actionCounter >= 20) {
                    stage = "end";
                    actionCounter = 0;
                }

            } else if (stage === "end") {
                newLine = endMessages[Math.floor(Math.random() * endMessages.length)];

                stage = "intro";
                introLines.push(
                    "[terminal]: Gathering files...",
                    "[terminal]: Files found: 1 985 948 394",
                    "[terminal]: Breaching Firewall..."
                );
            }

            lines.push(newLine);

            if (lines.length > maxLines) lines.shift();

            nextLineTime = getRandomSpeed();
        }
    }

    ctx.fillStyle = 'lime';

    lines.forEach((line, i) => {
        ctx.fillText(line, 5, (i + 1) * lineHeight);
    });

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);