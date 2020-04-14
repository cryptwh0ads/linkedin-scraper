const scrapedin = require("scrapedin");
const cookies = require("./cookies");

const getProfile = async (props) => {
  const options = {
    cookies,
    hasToGetContactInfo: true,
    hasToLog: true,
    isHeadless: true,
    type: "profile",
  };
  var dataProfile;
  await scrapedin(options)
    .then((profileScraper) =>
      profileScraper(`https://www.linkedin.com/in/${props[0]}`),
    )
    .then((profile) => (dataProfile = profile))
    .catch((err) => (dataProfile = err));

  var { name } = dataProfile.profileAlternative;
  var { contact, positions } = dataProfile;

  positions = positions[0];

  let email, phone, linkedInUrl;

  try {
    contact.map((ctt) => {
      if (ctt.type.includes("Perfil") || ctt.type.includes("perfil")) {
        linkedInUrl = ctt.values[0];
      }
      if (ctt.type === "Telefone") {
        phone = ctt.values[0];
      }
      if (ctt.type === "E-mail") {
        email = ctt.values[0];
      }
    });
  } catch (err) {
    console.log(err);
  }

  var companyUrl = positions.companyLinkedinUrl.split("company/")[1];

  const optionsCompany = {
    cookies,
    hasToGetContactInfo: true,
    hasToLog: true,
    isHeadless: true,
    type: "company",
  };
  var dataCompany;
  await scrapedin(optionsCompany)
    .then((profileScraper) =>
      profileScraper(`https://www.linkedin.com/company/${companyUrl}about`),
    )
    .then((company) => (dataCompany = company))
    .catch((err) => (dataCompany = err));
  var { companyName } = dataCompany.company;
  var { site, setor } = dataCompany.info;

  return {
    data: {
      name,
      contacts: {
        linkedInUrl,
        email,
        phone,
      },
      positions,
      companyInfo: {
        companyName,
        site,
        setor,
      },
    },
  };
};

module.exports = getProfile;
