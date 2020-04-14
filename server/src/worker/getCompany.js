const scrapedin = require("scrapedin");
const cookies = require("./cookies");

const getCompany = async (props) => {
  const options = {
    cookies,

    hasToGetContactInfo: true,
    hasToLog: true,
    isHeadless: true,
    type: "company",
  };
  var data;
  await scrapedin(options)
    .then((profileScraper) =>
      profileScraper(
        `https://www.linkedin.com/company/kivalita-consulting/about`,
      ),
    )
    .catch((err) => (data = err))
    .then((profile) => (data = profile));

  console.log(data);
};

getCompany();

module.exports = getCompany;
