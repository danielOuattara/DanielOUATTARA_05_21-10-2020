var image_teddy = document.querySelector('img[alt="teddy-icon"]');
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var data = this.responseText; 
        image_teddy.setAttribute("src", data);
    }
};

request.open("GET", "http://localhost:3000/back-end/images/teddy_1.jpg");
request.send();
