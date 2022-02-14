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

export const countryOfOperationCodefromId = (CountryId) => {
  let givenCountry = "";

  switch (CountryId) {
    case "1":
      givenCountry = "ke";
      break;
    case "2":
      givenCountry = "tz";
      break;
    case "3":
      givenCountry = "tg";
      break;
    case "4":
      givenCountry = "ug";
      break;
    default:
      givenCountry = "ke";
  }
  return givenCountry;
};

export const getCountryIconLink = (country) => {
  let givenCountryIconLink = "";

  switch (country) {
    case "ke":
      givenCountryIconLink = "https://icons.elipa.co/iPay_newlogo.svg";
      break;
    case "tg":
      givenCountryIconLink = "https://icons.elipa.co/Togo.svg";
      break;
    case "tz":
      givenCountryIconLink = "https://icons.elipa.co/Tanzania.svg";
      break;
    case "ug":
      givenCountryIconLink = "https://icons.elipa.co/Uganda.svg";
      break;
    default:
      givenCountryIconLink = "https://icons.elipa.co/iPay_newlogo.svg";
  }
  return givenCountryIconLink;
};
