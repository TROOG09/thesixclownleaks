/* MATRIX RAIN */
let canvas=document.getElementById("matrix");
let ctx=canvas.getContext("2d");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
let letters="01ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let fontSize=14;
let columns=canvas.width/fontSize;
let drops=[];for(let x=0;x<columns;x++) drops[x]=1;
function draw(){
ctx.fillStyle="rgba(0,0,0,0.05)";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="#00ff41";
ctx.font=fontSize+"px monospace";
for(let i=0;i<drops.length;i++){
let text=letters[Math.floor(Math.random()*letters.length)];
ctx.fillText(text,i*fontSize,drops[i]*fontSize);
if(drops[i]*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
drops[i]++;
}}
setInterval(draw,33);

/* TERMINAL */
function log(text){
let term=document.getElementById("terminal");
term.innerHTML+="> "+text+"\n";
term.scrollTop=term.scrollHeight;
}

/* MAP */
var map=L.map('map').setView([20,0],2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
var marker;

/* ROUTE VISUALIZER */
function drawRoute(lat,lon){
let route=[[40.4168,-3.7038],[48.8566,2.3522],[50.1109,8.6821],[lat,lon]];
for(let i=0;i<route.length-1;i++){
L.polyline([route[i],route[i+1]],{color:"#00ff41"}).addTo(map);}
}

/* SCAN */
async function scan(){
let ip=document.getElementById("ip").value;
document.getElementById("terminal").innerHTML="";
log("initializing OSINT scan...");
log("collecting network intelligence...");
log("querying geolocation database...");

let res=await fetch("http://ip-api.com/json/"+ip);
let data=await res.json();

log("ip detected: "+data.query);
log("isp: "+data.isp);
log("asn: "+data.as);

document.getElementById("ipinfo").innerHTML=`
<h3>IP INFO</h3>
IP: ${data.query}<br>ASN: ${data.as}<br>Org: ${data.org}`;
document.getElementById("network").innerHTML=`
<h3>NETWORK</h3>
ISP: ${data.isp}<br>Timezone: ${data.timezone}`;
document.getElementById("location").innerHTML=`
<h3>LOCATION</h3>
Country: ${data.country}<br>City: ${data.city}<br>Lat: ${data.lat}<br>Lon: ${data.lon}`;
document.getElementById("security").innerHTML=`
<h3>SECURITY</h3>
Proxy: ${data.proxy}<br>Hosting: ${data.hosting}<br>Mobile: ${data.mobile}`;
document.getElementById("dns").innerHTML=`
<h3>DNS</h3>Reverse DNS: ${data.reverse || "Unknown"}`;
document.getElementById("system").innerHTML=`
<h3>SYSTEM</h3>Region: ${data.regionName}<br>ZIP: ${data.zip}`;

if(marker) map.removeLayer(marker);
marker=L.marker([data.lat,data.lon]).addTo(map);
map.setView([data.lat,data.lon],5);
drawRoute(data.lat,data.lon);

log("mapping route nodes...");
log("analysis complete.");
log("Gracias por usar thesixclown leaks.");
log("Ahora eres parte de thesixclown.");
}
