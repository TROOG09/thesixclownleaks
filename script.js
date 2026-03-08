// ------------------- 🌍 THREE JS GLOBE -------------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,1,0.1,1000);
const renderer = new THREE.WebGLRenderer({canvas:document.getElementById("globe")});
renderer.setSize(300,300);

// Textura de la Tierra
const loader = new THREE.TextureLoader();
const geometry = new THREE.SphereGeometry(5,32,32);
const material = new THREE.MeshBasicMaterial({
    map: loader.load("https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg")
});
const earth = new THREE.Mesh(geometry,material);
scene.add(earth);

camera.position.z = 10;

function animateGlobe(){
    requestAnimationFrame(animateGlobe);
    earth.rotation.y += 0.002;
    renderer.render(scene,camera);
}
animateGlobe();

// ------------------- 🛰 LEAFLET MAP -------------------
const map = L.map('map').setView([20,0],2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// IP simuladas
const ips = ["8.8.8.8","1.1.1.1","208.67.222.222"];
ips.forEach(ip=>{
    fetch("https://ipapi.co/"+ip+"/json/")
    .then(r=>r.json())
    .then(d=>{
        L.marker([d.latitude,d.longitude])
        .addTo(map)
        .bindPopup(ip);
    })
});

// ------------------- 📊 IP DATA -------------------
async function loadData(){
    let ipapi = await fetch("https://ipapi.co/json/").then(r=>r.json());
    let ipwho = await fetch("https://ipwho.is/").then(r=>r.json());

    let info = "";
    for(let k in ipapi) info += k+" : "+ipapi[k]+"\n";
    for(let k in ipwho) info += k+" : "+ipwho[k]+"\n";
    document.getElementById("data").textContent = info;
}
loadData();

// ------------------- 🧠 NETWORK GRAPH -------------------
var nodes = new vis.DataSet([
    {id:1,label:"User"},
    {id:2,label:"Router"},
    {id:3,label:"ISP"},
    {id:4,label:"Internet"},
    {id:5,label:"Server"},
    {id:6,label:"API"},
    {id:7,label:"Database"}
]);
var edges = new vis.DataSet([
    {from:1,to:2},{from:2,to:3},{from:3,to:4},{from:4,to:5},{from:5,to:6},{from:6,to:7}
]);
new vis.Network(document.getElementById("graph"),{nodes,edges},{nodes:{color:"#00ff9f"},edges:{color:"#00ff9f"},physics:{stabilization:false}});

// ------------------- 📡 TRACEROUTE SIMULADO -------------------
const hops = ["192.168.1.1","10.0.0.1","ISP Gateway","IXP","Server"];
let trace="";
hops.forEach((h,i)=>{trace += (i+1)+"  "+h+"\n";});
document.getElementById("trace").textContent = trace;

// ------------------- 📈 TRAFFIC CHART -------------------
new Chart(document.getElementById("chart"),{
    type:"line",
    data:{
        labels:["1","2","3","4","5","6","7"],
        datasets:[{
            label:"Traffic",
            data:[Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100],
            borderColor:"#00ff9f"
        }]
    }
});

// ------------------- 🖥 TERMINAL -------------------
const term = document.getElementById("terminal");
const cmd = document.getElementById("cmd");
function print(t){term.innerHTML += t+"<br>"; term.scrollTop = term.scrollHeight;}
const commands = ["help","ip","trace","graph","map","globe","traffic","ports","status","connections","alerts","scan","dashboard","simulate","logs","update","ping","top","clear","exit"];
cmd.addEventListener("keydown",e=>{
    if(e.key==="Enter"){
        let c = cmd.value.trim();
        print("> "+c);
        if(c==="help") print("Commands: "+commands.join(", "));
        else if(c==="ip") print(document.getElementById("data").textContent);
        else if(c==="trace") print(document.getElementById("trace").textContent);
        else if(c==="graph") print("Network graph visualized above.");
        else if(c==="map") print("IP map displayed above.");
        else if(c==="globe") print("Globe spinning above.");
        else if(c==="traffic") print("Traffic chart shown above.");
        else if(c==="ports") print("Simulated ports: 22 OPEN, 80 OPEN, 443 CLOSED...");
        else if(c==="clear") term.innerHTML="";
        else print("Command not found.");
        cmd.value="";
    }
});
