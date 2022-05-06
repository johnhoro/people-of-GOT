let rootElement = document.querySelector("main");
let rootTags = document.querySelector(".tags");
let search = document.querySelector(".search");

let allPeople = got.houses.reduce((acc, cv) => {
  acc = acc.concat(cv.people);
  return acc;
}, []);
console.log(allPeople);

let allTags = got.houses.map((house) => house.name);
console.log({ allTags });

let activeHouse = "";

function createGOT(data = []) {
  rootElement.innerHTML = "";
  data.forEach((p) => {
    const article = document.createElement("article");
    const peopleInfo = document.createElement("div");
    const img = document.createElement("img");
    img.src = p.image;
    const name = document.createElement("h2");
    name.innerText = p.name;
    const description = document.createElement("p");
    description.innerText = p.description;
    const learnMoreBtn = document.createElement("button");
    learnMoreBtn.innerText = "Learn More!";

    peopleInfo.append(img, name);
    article.append(peopleInfo, description, learnMoreBtn);
    rootElement.append(article);
  });
}

function createTagsUI(tags = []) {
  rootTags.innerHTML = "";
  tags.forEach((tag) => {
    let li = document.createElement("li");
    li.innerText = tag;

    if (activeHouse === tag) {
      li.classList.add(`active`);
    }

    li.addEventListener("click", () => {
      activeHouse = tag;
      let peopleOfTheHouse =
        got.houses.find((house) => house.name === tag).people || [];
      console.log(peopleOfTheHouse);
      createGOT(peopleOfTheHouse);
      createTagsUI(allTags);
    });

    rootTags.append(li);
  });
}

function handleSearch(event) {
  let serchText = event.target.value;
  let filteredPeople = allPeople.filter((p) =>
    p.name.toLowerCase().includes(serchText.toLowerCase())
  );
  createGOT(filteredPeople);
} 

search.addEventListener("input", handleSearch);
createGOT(allPeople);
createTagsUI(allTags);





