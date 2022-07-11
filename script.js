const coffeList = document.querySelector(".coffee--list");
const content = document.querySelector(".content");

const coffeUrl = "https://api.sampleapis.com/coffee/hot";

let coffeeData;

const dataRequest = () => {
  fetch(coffeUrl)
    .then((data) => data.json())
    .then((result) => {
      coffeeData = result;
      result.map((item) => createCoffeeList(item));
    });
};

dataRequest();

let getImg = (path) => {
  return new Promise((resolve, reject)=> {
    let image = new Image();
    image.src = path;
    
    image.onload = () => resolve(image);
    image.onerror = () => reject(path);
  })
}

let createCoffeeList = (data) => {
  let li = document.createElement("li");
  li.classList.add("coffee__item");
  coffeList.append(li);

  let a = document.createElement("a");
  a.classList.add("coffee__button");
  a.textContent = data.title;
  li.append(a);
  a.addEventListener("click", (e) => {
    e.preventDefault;
    let clickedCoffeeItem = e.target.textContent;
    let clickedCoffeeObject = coffeeData.find(
      (item) => item.title === clickedCoffeeItem
    );
    console.log(clickedCoffeeObject);
    getImg(clickedCoffeeObject.image).then(image => {
      createContent(clickedCoffeeObject, image);
    })
  });
};

let createContent = async (data, image) => {
  content.innerHTML = "";

  let contentText = document.createElement("div");
  contentText.classList.add("content__text");
  content.append(contentText);

  let coffeeName = document.createElement("div");
  coffeeName.classList.add("name");
  coffeeName.textContent = data.title;
  contentText.append(coffeeName);

  let coffeeDescription = document.createElement("div");
  coffeeDescription.classList.add("name");
  coffeeDescription.textContent = data.description;
  contentText.append(coffeeDescription);

  let ingridients = document.createElement("div");
  ingridients.classList.add("name");
  let ingridientsToString = () => {
    return data.ingredients.join(", ");
  };
  contentText.append(ingridientsToString());

  let picWrapper = document.createElement("div");
  picWrapper.classList.add("pic-wrapper");
  content.append(picWrapper);

  image.classList.add("pic-img");
  // if (data.image) {
  //   picImg.setAttribute("src", data.img);
  // } else {
  //   picImg.setAttribute(
  //     "src",
  //     "https://img.championat.com/news/big/c/j/kakoe-moloko-luchshe-dobavljat-v-kofe_15993061471816410499.jpg"
  //   );
  // }
  picWrapper.append(image);
};
