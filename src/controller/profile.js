const getProfile = require("../worker/getProfileInfo");

const get = () => async (req, res) => {
  const profileName = req.query.name;

  const profileFetched = await getProfile(profileName);

  res.send(profileFetched);
};

module.exports = {
  get,
};
