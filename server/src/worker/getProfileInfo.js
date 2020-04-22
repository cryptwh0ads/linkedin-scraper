const scrapedin = require("scrapedin");
const cookies = require("./cookies");

const getProfileInfo = async (profileURL) => {
  console.log(profileURL);
  const options = {
    cookies,
    hasToGetContactInfo: true,
    hasToLog: true,
    type: "profile",
  };

  var dataProfile;

  await scrapedin(options)
    .then((profileScraper) =>
      profileScraper(`https://www.linkedin.com/in/${profileURL}`),
    )
    .then((profile) => (dataProfile = profile))
    .catch((err) => {
      console.error(err);
    });

  let email, phone, linkedInUrl;

  try {
    dataProfile.contact.map((ctt) => {
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

  return {
    email,
    phone,
    linkedInUrl,
    positions: dataProfile.positions[0],
    name: dataProfile.profileAlternative,
  };
};

const getCompanyInfo = async (companyURL) => {
  const optionsCompany = {
    cookies,
    hasToGetContactInfo: true,
    type: "company",
  };
  var dataCompany;
  await scrapedin(optionsCompany)
    .then((profileScraper) =>
      profileScraper(`https://www.linkedin.com/company/${companyURL}about`),
    )
    .then((company) => (dataCompany = company))
    .catch((err) => (dataCompany = err));

  return {
    companyName: dataCompany.company,
    site: dataCompany.info,
    setor: dataCompany.info,
  };
};

const getProfile = async (props) => {
  const { name, email, phone, linkedInUrl, positions } = await getProfileInfo(
    props[0],
  );
  const companyUrl = positions.companyLinkedinUrl.split("company/")[1];
  const { companyName, setor, site } = await getCompanyInfo(companyUrl);
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
