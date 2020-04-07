const scrapedin = require("scrapedin");

const options = {
  email: "your@email.com",
  password: "yourPass",
  hasToGetContactInfo: true,
};

const getProfile = () => {
  scrapedin(options)
    .then((profileScraper) =>
      profileScraper("https://www.linkedin.com/in/some-profile"),
    )
    .then((profile) => console.log(profile));
};

module.exports = getProfile;
