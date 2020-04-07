const scrapedin = require("scrapedin");

const options = {
  email: "your@email.com",
  password: "yourPass",
  hasToGetContactInfo: true,
};

const getProfile = async (props) => {
  var data;
  await scrapedin(options)
    .then((profileScraper) =>
      profileScraper(`https://www.linkedin.com/in/${props}`),
    )
    .then((profile) => (data = profile));

  return {
    data,
  };
};

module.exports = getProfile;
