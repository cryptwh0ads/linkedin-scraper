const getProfile = require("../worker/getProfileInfo");

const getProfileInfo = () => async (req, res) => {
  const { profileName } = req.params;
  const { socialPasswd, socialEmail } = req.body;
  const profileFetched = await getProfile([
    profileName,
    socialEmail,
    socialPasswd,
  ]);

  res.send(profileFetched);
};

module.exports = {
  getProfileInfo,
};
