const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 200;

let painting = false;

const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const clearBtn = document.getElementById("clear");

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = colorPicker.value;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", endPosition);
canvas.addEventListener("touchmove", draw);

clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});