let spinner = "./tail-spin.svg"; // path to the svg file
//fetch images from dalle mini api on button click
let proxyurl = "https://corsproxy.io/?";
let prompt = document.querySelector(`#prompt`);
let imageset = [];
let imageHTML = "";

document.querySelector(".btn").addEventListener("click", function (e) {
  e.preventDefault();
  if (prompt.value.trim() != ``) {
    imageHTML = "";
    document.querySelector("#images").classList.remove("loaded-images");
    document.querySelector(".btn").disabled = true;
    document.querySelector(".btn").innerHTML = "Loading...";
    document.querySelector(
      "#images"
    ).innerHTML = `<img src="${spinner}" alt="spinner" class="spinner">`;
    fetch(
      `${proxyurl}${encodeURIComponent`https://backend.craiyon.com/generate`}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${prompt.value}`,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("#images").classList.add("loaded-images");
        imageset = [];
        data.images.forEach((image) => {
          imageset.push(image);
          imageHTML += `<img class="images" src="data:image/webp;base64, ${image}" />`;
        });
        document.querySelector("#images").innerHTML = imageHTML;
        document.querySelector(".btn").disabled = false;
        document.querySelector(".btn").innerHTML = "Generate Images!";
      });
  }
});
