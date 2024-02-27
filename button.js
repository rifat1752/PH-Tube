
const handleCategory =async() => {
 
  const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await response.json();

  const tabContainer = document.getElementById('tab-container');
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML =`
    <a onclick=" handleLoadData('${category.category_id}')" class="tab"> ${category.category}</a> 
    `
    tabContainer.appendChild(div);
  });

// tab bg
const tabs = document.querySelectorAll(".tab");

const tabCount = tabs.length;

// Set the first tab as active initially
tabs[0].classList.add("active");
tabs[0].style.backgroundColor = "red";
tabs[0].style.color = "white";
tabs[0].style.borderRadius = "5px";

for (let i = 0; i < tabCount; i++) {
  const button = tabs[i];

  button.addEventListener("click", function () {
    // Set the background color of the clicked button to red
    button.classList.add("active");
    button.style.backgroundColor = "red";
    button.style.color = "white";
    button.style.borderRadius = "5px";

    // Set the background color of the other buttons to white
    for (let j = 0; j < tabCount; j++) {
      if (j !== i) {
        tabs[j].classList.remove("active");
        tabs[j].style.backgroundColor = "white";
        tabs[j].style.color = "black";
        tabs[j].style.borderRadius = "0px";
      }
    }
  });
}

};

const handleLoadData=async (category_id) =>{
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
  const data = await response.json();
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML= "";
  if (category_id ==1005){
    const cardDiv =document.createElement('div');
      cardDiv.classList.add('.post');
      cardDiv.innerHTML = `
      <div class="none  card card-compact  md:w-56 h-80 mb-10      flex flex-col">
      <img class="card-img w-60 h-60 " src="./images/Icon.png">
      <p class="text-xl font-bold text-center">Oops!! Sorry, There is no content here </p>
   </div>
              
      `;
      cardContainer.appendChild(cardDiv)
  }

data.data.forEach((post) => {
  

  // min calculation
function secondsToHoursMinutes(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hoursText = hours > 0 ? `${hours} hr${hours > 1 ? 's' : ''}` : '';
  const minutesText = minutes > 0 ? `${minutes} min${minutes > 1 ? 's ago' : ''}` : '';

  const timeArray = [hoursText, minutesText].filter(Boolean);

  return timeArray.join(' ');
}
// card create
  const cardDiv =document.createElement('div');
      cardDiv.classList.add('post');
      cardDiv.innerHTML = `
              <div class="img-part">
                 <img class="card-img" src="${post.thumbnail}">
                 <p class="time">${secondsToHoursMinutes(post.others.posted_date)} </p>
              </div>
              <div class="details-part">
                 <img class="profile-pic" src="${post.authors[0].profile_picture}">
                 <div class="details">
                  <h1>${post.title} </h1>
                  <p >${post.authors[0]?.profile_name || 'Unknown'} ${post.authors[0]?.verified ? '<img style="float:left;" src="./images/verified.png" alt="">' : ''}</p>
                  <p class="views">${post.others.views} views</p>
                 </div>
              </div>

      `;
      cardContainer.appendChild(cardDiv)
})

 }

// Function to sort cards by views
const sortByViews = () => {
  const cardContainer = document.getElementById('card-container');
  const cards = Array.from(cardContainer.getElementsByClassName('post'));

  // Sort the cards based on views (assuming 'views' is a number property in your data)
  cards.sort((a, b) => {
      const viewsA = parseInt(a.querySelector('.views').textContent);
      const viewsB = parseInt(b.querySelector('.views').textContent);
      return viewsB - viewsA; // Sort in descending order
  });

  // Clear the card container and append the sorted cards
  cardContainer.innerHTML = '';
  cards.forEach((card) => {
      cardContainer.appendChild(card);
  });
};
const sortButton = document.getElementById('sortButton');
sortButton.addEventListener('click', sortByViews);


handleCategory();
handleLoadData(1000);

