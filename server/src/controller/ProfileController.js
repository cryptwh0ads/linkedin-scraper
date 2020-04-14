const getProfile = require("../worker/getProfileInfo");

const getProfileInfo = () => async (req, res) => {
  const { profileName } = req.params;
  const profileFetched = await getProfile([profileName]);

  res.send(profileFetched);
};

module.exports = {
  getProfileInfo,
};
