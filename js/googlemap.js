// JavaScript Document
      "use strict";

let map, popup, Popup, popup2;
/** Initializes the map and the custom popup. */

function initGMap(year, pollutant) {
var ajaxresponse;	 
map = new google.maps.Map(document.getElementById("map8"), {
  center: {
	lat: -33.9,
	lng: 151.1
  },
  zoom: 10
});
        /**
         * A customized popup on the map.
         */

class Popup extends google.maps.OverlayView {constructor(position, content) {
super();
this.position = position;
content.classList.add("popup-bubble"); // This zero-height div is positioned at the bottom of the bubble.

  if( clndiv.innerHTML >100)
  content.classList.add("badhealth");  
  if( clndiv.innerHTML >70 && clndiv.innerHTML <100)
  content.classList.add("normalhealth");  
  if( clndiv.innerHTML <40 )
  content.classList.add("goodhealth"); 


const bubbleAnchor = document.createElement("div");
bubbleAnchor.classList.add("popup-bubble-anchor");

bubbleAnchor.appendChild(content); // This zero-height div is positioned at the bottom of the tip.


this.containerDiv = document.createElement("div");
this.containerDiv.classList.add("popup-container");
this.containerDiv.appendChild(bubbleAnchor); // Optionally stop clicks, etc., from bubbling up to the map.

Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
}
/** Called when the popup is added to the map. */

onAdd() {
this.getPanes().floatPane.appendChild(this.containerDiv);
}
/** Called when the popup is removed from the map. */

onRemove() {
if (this.containerDiv.parentElement) {
  this.containerDiv.parentElement.removeChild(this.containerDiv);
}
}
/** Called each frame when the popup needs to draw itself. */

draw() {
const divPosition = this.getProjection().fromLatLngToDivPixel(
  this.position
); // Hide the popup when it is far out of view.

const display =
  Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
	? "block"
	: "none";

if (display === "block") {
  this.containerDiv.style.left = divPosition.x + "px";
  this.containerDiv.style.top = divPosition.y + "px";
}

if (this.containerDiv.style.display !== display) {
  this.containerDiv.style.display = display;
}
}
}
	// ajax code
	  ajaxresponse  = [ [-33.866,151.196, 120] , [-33.866,150.196, 10], [-33.866,152.196, 85] ]
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		
   // this.responseText;
    ajaxresponse  = [ [-33.866,151.196, 120] , [-33.866,150.196, 10], [-33.866,152.196, 85] ]
	}
  };
  xhttp.open("GET", "/getresults?year="+year+"&pollutant="+pollutant, true);
  xhttp.send();
	
 
 var maindiv = document.getElementById("content");

for(var i=0;i<ajaxresponse.length;i++){ 
	var clndiv = maindiv.cloneNode(true);
	clndiv.setAttribute("Id","content"+i);
	clndiv.innerHTML = ajaxresponse[i][2];

   document.getElementById("content").appendChild(clndiv);
popup = new Popup(new google.maps.LatLng(ajaxresponse[i][0], ajaxresponse[i][1]),clndiv);

popup.setMap(map);
}


}


 