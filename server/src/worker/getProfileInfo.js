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
    .catch((err) => (data = err))
    .then((profile) => (data = profile));
  var { name } = data.profileAlternative;
  var { contact, positions } = data;

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

  return {
    data: {
      name,
      contacts: {
        linkedInUrl,
        email,
        phone,
      },
      positions,
    },
  };
};

module.exports = getProfile;
