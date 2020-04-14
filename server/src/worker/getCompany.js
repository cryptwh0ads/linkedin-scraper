const scrapedin = require("scrapedin");

const getCompany = async (props) => {
  const options = {
    email: "xxcruizz@gmail.com",
    password: "vcm004699",
    hasToGetContactInfo: true,
    hasToLog: true,
    isHeadless: true,
    type: "company",
  };
  var data;
  await scrapedin(options)
    .then((profileScraper) =>
      profileScraper(`https://www.linkedin.com/company/google/about`),
    )
    .catch((err) => (data = err))
    .then((profile) => (data = profile));

  console.log(data);
};

getCompany();

module.exports = getCompany;
