const scrapedin = require("scrapedin");

const getProfile = async (props) => {
  const options = {
    email: props[1],
    password: props[2],
    hasToGetContactInfo: true,
  };
  var data;
  await scrapedin(options)
    .then((profileScraper) =>
      profileScraper(`https://www.linkedin.com/in/${props[0]}`),
    )
    .catch((err) => (data = "Error was been found"))
    .then((profile) => (data = profile));

  return {
    data,
  };
};

module.exports = getProfile;
