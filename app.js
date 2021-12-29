const inputCountry = document.querySelector(".country");
const findBtn = document.querySelector(".find");
const form = document.querySelector(".form");

const temp = document.querySelector(".success");
const failure = document.querySelector(".fail");
const cardContainer = document.querySelector(".card-container");
const alertShow = document.querySelector(".alert-show");

window.addEventListener("load", addDataGolbal);
form.addEventListener("submit", showCard);

function showCard(e) {
  e.preventDefault();

  const value = inputCountry.value.trim();
  let newValue = new RegExp(`${value}`, "i");

  fetch("https://api.covid19api.com/summary")
    .then(res => res.json())
    .then(data => {
      const allCountries = data.Countries;

      const newData = allCountries.filter(
        country =>
          country.Country.match(newValue) ||
          country.Slug.match(newValue) ||
          country.CountryCode.match(newValue)
      );

      if (newData.length > 0) {
        newData.forEach(country => addData(country));
      } else {
        showError(value);
      }
    })
    .catch(err => {
      showError(value);
      console.error(err);
    });

  inputCountry.value = "";
}

function addData(country) {
  let clone = temp.content.cloneNode(true);

  const cardImg = clone.querySelector(".card-img-top");

  const countryName = clone.querySelector(".country-name");
  const totalConfirmed = clone.querySelector(".total-confirmed");
  const totalRecovered = clone.querySelector(".total-recovered");
  const totalDeaths = clone.querySelector(".total-deaths");
  const date = clone.querySelector(".date");

  if (cardContainer.childElementCount > 0) {
    cardContainer.insertBefore(clone, cardContainer.firstChild);
    setTimeout (()=> animationStart(), 300);
  } else {
    cardContainer.appendChild(clone);
    setTimeout (()=> animationStart(), 300);
  }

  cardImg.src = `https://flagcdn.com/${country.CountryCode.toLowerCase()}.svg`;

  countryName.textContent = country.Country;
  totalConfirmed.textContent = "Total Confirmed: " + country.TotalConfirmed;
  totalRecovered.textContent = "Total Recovered: " + country.TotalRecovered;
  totalDeaths.textContent = "Total Deaths" + country.TotalDeaths;
  date.textContent = "Date: " + country.Date;

  const deleteBtns = document.querySelectorAll(".delete");

  deleteBtns.forEach(btn =>
    btn.addEventListener("click", e => {
      const targetCard = e.target.parentElement;
      targetCard.classList.remove("animation");
      targetCard.classList.add("animation-end");
      animationEnd(e);
      setTimeout(() => targetCard.remove(), 400);
    })
  );
}

function addDataGolbal() {
  fetch("https://api.covid19api.com/summary")
    .then(res => res.json())
    .then(data => {
      const globalData = data.Global;

      const global = document.querySelector(".global");

      const totalConfirmed = global.querySelector(".total-confirmed");
      const totalRecovered = global.querySelector(".total-recovered");
      const totalDeaths = global.querySelector(".total-deaths");
      const newDeaths = global.querySelector(".new-deaths");

      totalConfirmed.textContent =
        "Total Confirmed: " + globalData.TotalConfirmed;
      totalRecovered.textContent =
        "Total Recovered: " + globalData.TotalRecovered;
      totalDeaths.textContent = "Total Deaths" + globalData.TotalDeaths;
      newDeaths.textContent = "New Deaths: " + globalData.NewDeaths;
    });
}

function showError(v) {
  let clone = failure.content.cloneNode(true);

  const failText = clone.querySelector(".fail-text");
  failText.textContent =
    "We cannot find any country with the name called " + `"${v}".`;
  const alertDiv = clone.querySelector(".alert");

  alertShow.appendChild(clone);
  setTimeout(function () {
    alertDiv.remove(clone);
  }, 2000);
}

const refreshbtn = document.querySelector(".refresh");

refreshbtn.addEventListener("click", () => {
  setTimeout(() => {
    document.location.reload(true);
  }, 1000);
});
