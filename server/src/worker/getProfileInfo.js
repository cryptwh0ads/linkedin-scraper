const scrapedin = require("scrapedin");

const getProfile = async (props) => {
  const options = {
    email: props[1],
    password: props[2],
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
    .catch((err) => (dataProfile = err))
    .then((profile) => (dataProfile = profile));
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
    email: props[1],
    password: props[2],
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
    .catch((err) => (dataCompany = err))
    .then((company) => (dataCompany = company));
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
