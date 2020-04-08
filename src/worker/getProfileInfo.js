const scrapedin = require("scrapedin");
const bcrypt = require("bcrypt");

const getProfile = async (props) => {
  const encrypted = bcrypt.hashSync(props[2], 10);
  const socialPasswd = bcrypt.compare(props[1].socialPasswd, encrypted);

  const options = {
    email: props[1].socialEmail,
    password: socialPasswd ? props[2] : null,
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
