export const countryOfOperation = (CountryCode) => {
  let givenCountry = "";

  switch (CountryCode) {
    case "ke":
      givenCountry = "Kenya";
      break;
    case "tg":
      givenCountry = "Togo";
      break;
    case "tz":
      givenCountry = "Tanzania";
      break;
    case "ug":
      givenCountry = "Uganda";
      break;
    default:
      givenCountry = "Kenya";
  }
  return givenCountry;
};

export const countryOfOperationCode = (country) => {
  let givenCountryCode = "";

  switch (country) {
    case "kenya":
      givenCountryCode = "ke";
      break;
    case "Togo":
      givenCountryCode = "tg";
      break;
    case "Tanzania":
      givenCountryCode = "tz";
      break;
    case "Uganda":
      givenCountryCode = "ug";
      break;
    default:
      givenCountryCode = "ke";
  }
  return givenCountryCode;
};
