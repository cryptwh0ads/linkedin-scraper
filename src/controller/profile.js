const getProfile = require("../worker/getProfileInfo");
const jwtDecode = require("jwt-decode");

const getProfileInfo = () => async (req, res) => {
  const profileName = req.query.name;
  const socialPasswd = req.body.socialPasswd;
  const decoded = jwtDecode(req.headers.authorization);
  const profileFetched = await getProfile([profileName, decoded, socialPasswd]);

  res.send(profileFetched);
};

module.exports = {
  getProfileInfo,
};
