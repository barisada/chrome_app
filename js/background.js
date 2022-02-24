const images = ["0.jpeg", "1.jpeg", "2.jpeg"];

const imageName = images[Math.floor(Math.random() * images.length)];

const imgTag = document.createElement("img");
imgTag.src = `img/${imageName}`;

document.body.appendChild(imgTag);
