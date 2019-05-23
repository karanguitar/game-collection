//Game Constructor
class Game {
  constructor(title, img, category, featured = false) {
    this.title = title;
    this.img = img;
    this.category = category;
    this.featured = featured;
    this.timesPlayed = 0;
  }
}

//Titles
const gameTitles = [
  "Firefly Alien",
  "Bee Bowling",
  "Elephant Company",
  "Ghost Economy",
  "Giraffe Headers",
  "Hungry Hippo",
  "Moving Monkey",
  "Potato Face",
  "Pool Fish"
];

//Images
const gameImages = [
  "images/alien.png",
  "images/bee.png",
  "images/elephant.png",
  "images/ghost.png",
  "images/giraffe.png",
  "images/hippo.png",
  "images/monkey.png",
  "images/potato.png",
  "images/pool-fish.png"
];

//Categories
const gameCategories = [
  "Creative Games",
  "Educational Games",
  "Strategy Games",
  "World Games",
  "Popular Games",
  "Adventure Games"
];

//Category Icons
const categoryIcons = [
  "icons/creativity_games.svg",
  "icons/educational_games.svg",
  "icons/strategy_games.svg",
  "icons/blog.svg",
  "icons/popular_games.svg",
  "icons/adventure_games.svg"
];

//Game instances
const alien = new Game(gameTitles[0], gameImages[0], gameCategories[0], false);

const bee = new Game(gameTitles[1], gameImages[1], gameCategories[2], false);

const elephant = new Game(
  gameTitles[2],
  gameImages[2],
  gameCategories[3],
  true
);

const ghost = new Game(gameTitles[3], gameImages[3], gameCategories[2], false);

const giraffe = new Game(gameTitles[4], gameImages[4], gameCategories[1], true);

const hippo = new Game(gameTitles[5], gameImages[5], gameCategories[2], true);

const monkey = new Game(gameTitles[6], gameImages[6], gameCategories[4], false);

const poolfish = new Game(
  gameTitles[7],
  gameImages[7],
  gameCategories[3],
  true
);

const potato = new Game(gameTitles[8], gameImages[8], gameCategories[4], true);

//Game instances list
const games = [
  alien,
  bee,
  elephant,
  ghost,
  giraffe,
  hippo,
  monkey,
  poolfish,
  potato
];

//DOM Strings
const elements = {
  burger: document.querySelector(".burger"),
  menu: document.querySelector(".menu"),
  navigation: document.querySelector(".navigation"),
  gamesCollection: document.querySelector(".games"),
  categoryList: document.querySelector(".options"),
  navigationCategoryList: document.querySelector(".navigation__categories"),
  navigationCategory: document.querySelector(".navigation__category"),
  featuredBtns: document.querySelector(".featured__btns"),
  featuredBtn: document.querySelectorAll(".featured__btn"),
  activeFeatured: document.getElementsByClassName("active"),
  activeCategory: document.getElementsByClassName("active__category"),
  activeCategoryNav: document.getElementsByClassName("active__category-nav"),
  featuredGames: document.querySelector(".featured__games"),
  featuredGame: document.querySelector(".featured__game"),
  modal: document.querySelector(".modal"),
  modalContent: document.querySelector(".modal__content")
};

//clears inner HTML
const clearHTML = element => {
  element.innerHTML = "";
};

//Open and closes menu
const toggleMenu = () => {
  elements.menu.classList.toggle("close");
  elements.navigation.classList.toggle("visible");
};

//event listener on Burger icon
elements.burger.addEventListener("click", () => {
  toggleMenu();
});

//Renders all the games on the page
const renderGameList = (games, classN, element) => {
  var html;

  if (games.length < 1) {
    html = `
      <h2 class="no-games" >There are no games in this category currently. </h2>
    `;

    element.insertAdjacentHTML("beforeend", html);
  }

  html = `        
    <div class="${classN}__game" >
        <img  class="${classN}__img" src=%img% />
        <div class="${classN}__title">%title%</div>
    </div>
`;
  games.map(game => {
    var newHtml;
    newHtml = html.replace("%img%", game.img);
    newHtml = newHtml.replace("%title%", game.title);
    element.insertAdjacentHTML("beforeend", newHtml);
  });
};

//Renders categories both in menu and front page
const renderCategories = (
  categories,
  categoryImages,
  classN,
  elementToInsert
) => {
  var html;

  html = `            
    <div id=%id% class="${classN}__category">
        <img class="${classN}__img" src="%img%"/>
        <div class="${classN}__title">%title%</div>
    </div>`;

  categories.map((category, i) => {
    var img, newHtml;
    img = categoryImages[i];

    newHtml = html.replace("%img%", img);
    newHtml = newHtml.replace("%title%", category);
    newHtml = newHtml.replace("%id%", category);

    elementToInsert.insertAdjacentHTML("beforeend", newHtml);
  });
};

//Removes active class from category
const removeActiveCategoryClass = (el, actClass) => {
  var current = el;
  if (current.length > 0) {
    current[0].className = current[0].className.replace(` ${actClass}`, "");
  }
};

//Selects the parallel category menu/front
//E.g. Selects Educational Games on Navigation if clicked on front page and vise versa
const effectParallelCategory = (classN, id) => {
  if (classN === "options__category") {
    removeActiveCategoryClass(
      elements.activeCategoryNav,
      "active__category-nav"
    );
    elements.navigationCategoryList.querySelector(`#${id}`).className +=
      " active__category-nav";
  } else {
    removeActiveCategoryClass(elements.activeCategory, "active__category");
    elements.categoryList.querySelector(`#${id}`).className +=
      " active__category";
  }
};

//Fetches games from category clicked
fetchCategoryGames = id => {
  return games.filter(cat => {
    return cat.category.split(" ")[0].toLowerCase() === id.toLowerCase();
  });
};

//All the functions that are set off once a category is selected
const categoryFunctions = (rm, activeClassN, classN, toggle, id) => {
  removeActiveCategoryClass(rm, `${activeClassN}`);

  let clickedClassName = `${classN}__category`;

  effectParallelCategory(clickedClassName, id);

  `${classN}__category` === event.target.className
    ? (event.target.className += ` ${activeClassN}`)
    : (event.target.parentNode.className += ` ${activeClassN}`);
  let res = fetchCategoryGames(id);

  clearHTML(elements.gamesCollection);
  toggle ? toggleMenu() : null;
  renderGameList(res, "games", elements.gamesCollection);
};

//Category click event function
const categoryClick = (element, classN, activeClassN, rm, toggle = false) => {
  element.addEventListener("click", event => {
    let id;
    if (event.target.className === `${classN}__category`) {
      id = event.target.id;
      categoryFunctions(rm, activeClassN, classN, toggle, id);
    } else if (
      event.target.className === `${classN}__img` ||
      event.target.className === `${classN}__title`
    ) {
      id = event.target.parentNode.id;
      categoryFunctions(rm, activeClassN, classN, toggle, id);
    }
  });
};

//Category click event for main page
categoryClick(
  elements.categoryList,
  "options",
  "active__category",
  elements.activeCategory
);

//Category click event for navigation
categoryClick(
  elements.navigationCategoryList,
  "navigation",
  "active__category-nav",
  elements.activeCategoryNav,
  true
);

//Displays modal
const openModal = () => {
  elements.modal.style.display = "block";
};

//Removes modal
const outsideClick = event => {
  if (event.target == elements.modal) {
    elements.modal.style.display = "none";
  }
};

//Modal content
const modalContent = id => {
  let html, newHtml, res;

  res = games.find(game => game.title === id);

  html = `
      <div class="modal__header">
        <h2>%header%</h2>
      </div>
      <div class="modal__body">
        <h1 class="modal__title">%title%</h1>
        <img class="modal__img" src="%img%"/>
      </div>
      <div class="modal__footer">
      </div>
  `;

  newHtml = html.replace("%header%", res.title);
  newHtml = newHtml.replace("%title%", res.title);
  newHtml = newHtml.replace("%img%", res.img);

  elements.modalContent.insertAdjacentHTML("beforeend", newHtml);
};

//Event to remove modal
window.addEventListener("click", outsideClick);

//Click on games to display modal. Takes in class name so it works on both main page and featured list.
const clickGame = (element, className) => {
  element.addEventListener("click", event => {
    let id;

    if (event.target.className === `${className}__game`) {
      id = event.target.childNodes[3].textContent;
    }

    if (event.target.className === `${className}__img`) {
      id = event.target.parentNode.childNodes[3].textContent;
    }

    if (event.target.className === `${className}__title`) {
      id = event.target.textContent;
    }
    clearHTML(elements.modalContent);
    modalContent(id);
    openModal();
  });
};

//Initializing click on featured
clickGame(elements.featuredGames, "featured");

//Initializing click on main
clickGame(elements.gamesCollection, "games");

//Initializing game list on load for featured
renderGameList(
  games.filter(game => game.featured),
  "featured",
  elements.featuredGames
);

//Adding active class for featured section
let featuredBtnsArr = Array.prototype.slice.call(elements.featuredBtn);
featuredBtnsArr.forEach(el => {
  el.addEventListener("click", () => {
    var current = elements.activeFeatured;
    current[0].className = current[0].className.replace(" active", "");
    el.className += " active";
    controlFeatured(el.id);
  });
});

//Getting games based on users selection in featured section
const controlFeatured = id => {
  let res;
  if (id === "feat") {
    clearHTML(elements.featuredGames);
    res = games.filter(game => game.featured);
    renderGameList(res, "featured", elements.featuredGames);
  }

  if (id === "last_played") {
    clearHTML(elements.featuredGames);
    res = [giraffe];
    renderGameList(res, "featured", elements.featuredGames);
  }

  if (id === "most_played") {
    clearHTML(elements.featuredGames);
    res = [monkey];
    renderGameList(res, "featured", elements.featuredGames);
  }
};

//Initializing game list on load
renderGameList(games, "games", elements.gamesCollection);

//Init for navigation categories
renderCategories(
  gameCategories,
  categoryIcons,
  "navigation",
  elements.navigationCategoryList
);

//Init for main page categories
renderCategories(
  gameCategories,
  categoryIcons,
  "options",
  elements.categoryList
);
