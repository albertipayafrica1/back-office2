export const countryOfOperation = (CountryCode) => {
  let givenCountry = "";

  switch (CountryCode) {
    case "KE":
      givenCountry = "1";
      break;
    case "TG":
      givenCountry = "3";
      break;
    case "TZ":
      givenCountry = "2";
      break;
    case "UG":
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
      givenCountryCode = "KE";
      break;
    case "Togo":
      givenCountryCode = "TG";
      break;
    case "Tanzania":
      givenCountryCode = "TZ";
      break;
    case "Uganda":
      givenCountryCode = "UG";
      break;
    default:
      givenCountryCode = "KE";
  }
  return givenCountryCode;
};

export const countryOfOperationCodefromId = (CountryId) => {
  let givenCountry = "";

  switch (CountryId) {
    case "1":
      givenCountry = "KE";
      break;
    case "2":
      givenCountry = "TZ";
      break;
    case "3":
      givenCountry = "TG";
      break;
    case "4":
      givenCountry = "UG";
      break;
    default:
      givenCountry = "KE";
  }
  return givenCountry;
};

export const getCountryIconLink = (country) => {
  let givenCountryIconLink = "";

  switch (country) {
    case "KE":
      givenCountryIconLink = "https://icons.elipa.co/iPay_newlogo.svg";
      break;
    case "TG":
      givenCountryIconLink = "https://icons.elipa.co/Togo.svg";
      break;
    case "TZ":
      givenCountryIconLink = "https://icons.elipa.co/Tanzania.svg";
      break;
    case "UG":
      givenCountryIconLink = "https://icons.elipa.co/Uganda.svg";
      break;
    default:
      givenCountryIconLink = "https://icons.elipa.co/iPay_newlogo.svg";
  }
  return givenCountryIconLink;
};

export const countryOfOperationFullName = (country) => {
  let givenCountryCode = "";

  switch (country) {
    case "KE":
      givenCountryCode = "Kenya";
      break;
    case "TG":
      givenCountryCode = "Togo";
      break;
    case "TZ":
      givenCountryCode = "Tanzania";
      break;
    case "UG":
      givenCountryCode = "Uganda";
      break;
    default:
      givenCountryCode = "Kenya";
  }
  return givenCountryCode;
};
