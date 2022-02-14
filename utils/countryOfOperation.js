export const countryOfOperation = (CountryCode) => {
  let givenCountry = "";

  switch (CountryCode) {
    case "ke":
      givenCountry = "1";
      break;
    case "tg":
      givenCountry = "3";
      break;
    case "tz":
      givenCountry = "2";
      break;
    case "ug":
      givenCountry = "4";
      break;
    default:
      givenCountry = "1";
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
