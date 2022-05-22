const getCountryData = async function (country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const [data] = await response.json();
    console.log(data);
  } catch (err) {}
};

const renderCountry = function (country) {
  const parentEl = document.querySelector(".country");
  const currency = Object.keys(country.currencies);
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
          <p class="country-currency">${currency[0]}</p>
        </div>
        <div class="country-detail">
          <p class="country-languages label">Languages</p>
          <p class="country-languages">English</p>
        </div>
        <div class="country-detail">
          <p class="country-neighbour label">Neighbours</p>
          <p class="country-neighbour">CAN, MEX</p>
        </div>
      </div>
    </div>
  `;
  parentEl.insertAdjacentHTML("afterbegin", html);
};

const country = getCountryData("USA");
renderCountry(country);
