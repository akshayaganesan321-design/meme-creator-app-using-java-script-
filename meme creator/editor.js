let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let image = new Image();
let texts = [];

let selectedText = null;
let offsetX, offsetY;

function loadTemplate(el){
  image.crossOrigin="anonymous";
  image.src = el.src;
}

document.getElementById("upload").addEventListener("change",function(){
  let reader = new FileReader();
  reader.onload = function(e){
    image.src = e.target.result;
  };
  reader.readAsDataURL(this.files[0]);
});

image.onload = function(){
  canvas.width = image.width;
  canvas.height = image.height;
  draw();
};

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(image,0,0);
  texts.forEach(t=>{
    ctx.font = t.size+"px Impact";
    ctx.fillStyle="white";
    ctx.strokeStyle="black";
    ctx.lineWidth=3;
    ctx.fillText(t.text,t.x,t.y);
    ctx.strokeText(t.text,t.x,t.y);
  });
}

function addText(){
  let txt = document.getElementById("caption").value;
  texts.push({text:txt,x:100,y:100,size:40});
  draw();
}

canvas.addEventListener("mousedown",startDrag);
canvas.addEventListener("mousemove",drag);
canvas.addEventListener("mouseup",stopDrag);

canvas.addEventListener("touchstart",startDrag);
canvas.addEventListener("touchmove",drag);
canvas.addEventListener("touchend",stopDrag);

function getMousePos(e){
  let rect = canvas.getBoundingClientRect();
  let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  let y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
  return {x,y};
}

function startDrag(e){
  let pos = getMousePos(e);
  texts.forEach(t=>{
    if(Math.abs(pos.x - t.x) < 100 && Math.abs(pos.y - t.y) < 40){
      selectedText = t;
      offsetX = pos.x - t.x;
      offsetY = pos.y - t.y;
    }
  });
}

function drag(e){
  if(selectedText){
    let pos = getMousePos(e);
    selectedText.x = pos.x - offsetX;
    selectedText.y = pos.y - offsetY;
    draw();
  }
}

function stopDrag(){
  selectedText = null;
}

function applyFilter(){
  let f = document.getElementById("filter").value;
  canvas.style.filter = f;
}

function download(){
  let link=document.createElement("a");
  link.download="meme.png";
  link.href=canvas.toDataURL();
  link.click();
}

function toggleDark(){
  document.body.classList.toggle("dark");
}

function saveMeme(){
  let data = canvas.toDataURL();
  let gallery = JSON.parse(localStorage.getItem("memes") || "[]");
  gallery.push(data);
  localStorage.setItem("memes",JSON.stringify(gallery));
  loadGallery();
}

function loadGallery(){
  let gallery = JSON.parse(localStorage.getItem("memes") || "[]");
  let container=document.getElementById("gallery");
  container.innerHTML="";
  gallery.forEach(src=>{
    let img=document.createElement("img");
    img.src=src;
    container.appendChild(img);
  });
}

loadGallery();

function generateAI(){
  let captions=[
    "When code works on first try",
    "When teacher says surprise test",
    "Me pretending to understand",
    "When WiFi stops working",
    "When deadline is tomorrow",
    "Programmer after fixing bug"
  ];
  let random=captions[Math.floor(Math.random()*captions.length)];
  document.getElementById("caption").value=random;
}
function eraseText() {
  if (texts.length > 0) {
    // Remove the last added text
    texts.pop();
    draw();
  } else {
    alert("No text to erase!");
  }
}