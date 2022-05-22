const parentEl = document.querySelector(".container");

// Renders list of countries to choose from
const chooseCountry = function (countries) {
  const countryNames = countries.map((country) => {
    return `<span class="choose-country">${country.name.common}</span>`;
  });

  const html = `
  <div class="choose-box">
    <p class="choose-message">There are ${countries.length} countries to choose from.</p>
    <p class="choose-message">Which one do you want to display?</p>
    ${countryNames}
  </div>
  `;

  parentEl.insertAdjacentHTML("afterbegin", html);
  const chooseCountryLinks = document.querySelectorAll(".choose-country");

  // Add event listeners to the links
  chooseCountryLinks.forEach((countryLink) => {
    countryLink.addEventListener("click", function (e) {
      // Store the country that was pressed in a variable
      const countryName = e.target.textContent;

      // Loop over the countries that we have to choose from and render
      // the one that we want
      countries.forEach((count) => {
        if (countryName === count.name.common) {
          parentEl.innerHTML = "";
          renderCountry(count);
        }
      });
    });
  });
};

// Create markup for the country we want to render
const renderCountry = function (country) {
  // Create constants for future use. we need to store currency and languages in constants
  // because they differ from country to country and it has to be done in order for code
  // to work for every country
  const currency = Object.keys(country.currencies)[0];
  const language = Object.keys(country.languages)[0];
  console.log(Object.keys(country.currencies));

  // Create the html for the country
  const html = `
    <div class="country">
      <div class="country-image-box">
        <img
          class="country-image"
          src="${country.flags.png}"
          alt="country image"
        />
      </div>
      <div class="country-information">
        <p class="country-name">${country.name.common}</p>
        <div class="country-detail">
          <p class="country-capital label">Capital</p>
          <p class="country-capital">${country.capital[0]}</p>
        </div>
        <div class="country-detail">
          <p class="country-currency label">Currency</p>
          <p class="country-currency">${
            country.currencies[currency].name
          } <br> ${country.currencies[currency].symbol}</p>
        </div>
        <div class="country-detail">
          <p class="country-languages label">Language</p>
          <p class="country-languages">${country.languages[language]}</p>
        </div>
        <div class="country-detail">
          <p class="country-population label">Population</p>
          <p class="country-population">${Math.ceil(
            country.population / 1000000
          )} mil</p>
        </div>
      </div>
    </div>
  `;
  // Insert generated markup into the parent element
  parentEl.insertAdjacentHTML("afterbegin", html);
};

// Get data about the country
const getCountryData = async function (country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );

    // Render error message if the inserted country does not exist
    if (response.status === 404) throw new Error("Country not found");
    const data = await response.json();

    if (data.length > 1) {
      // If there are multiple countries that are returned with the same name,
      // Ask the user which one to display
      chooseCountry(data);
    } else {
      // If there's only one country, render it
      renderCountry(data[0]);
    }

    // Render errors that show up
  } catch (err) {
    const error = `<p class="error-message"> ${err} </p>`;
    parentEl.insertAdjacentHTML("afterbegin", error);
  }
};

getCountryData("asdfsa");
