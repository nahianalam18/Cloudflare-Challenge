// Nahian Alam
// alam.nahian18@gmail.com
//https://nahian-alam.nahian18.workers.dev/

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */

let links = []; // Array used to store the links that is received from the fetch request

// Function used to fetch data from the given link
async function setUrlData() {
  let dataD = await fetch(
    "https://cfw-takehome.developers.workers.dev/api/variants"
  );
  await Promise.resolve(dataD.json()).then(function (val) {
    links = val.variants; // URL links received from the fetch request is being stored in the links array
  });
}

// Function to test if load is evenly distributed
// This function is not used to determine the output
// It is only a way of showing that one of the two links
// have approximately 50% chance of getting picked
async function testChoicePercentage() {
  let choice1 = 0;
  let choice2 = 0;
  for (i = 0; i < 10000; i++) {
    var randomSelectedLink = links[~~(Math.random() * links.length)];
    if (randomSelectedLink == links[0]) {
      choice1 += 1;
    } else {
      choice2 += 1;
    }
  }
  console.log(choice1 / 10000); // Roughly 0.50
  console.log(choice2 / 10000); // Roughly 0.50
}

async function getRandomResponse() {
  var randomSelectedLink = links[~~(Math.random() * links.length)]; // Index 0 or 1 is selected at random with a 50% chance
  let recievedResponse = await fetch(randomSelectedLink); // A fetch request is sent using the url and response saved
  return recievedResponse; // response is returned
}

async function handleRequest(request) {
  await setUrlData(); // Function called to fetch url data
  let response1 = await getRandomResponse(); // Random response received
  return response1; // Variant 1 or 2 is returned on random
}
