const getProfile = require("../worker/getProfileInfo");

const getInfo = () => async (req, res) => {
  const { data } = req.body;

  const Profiles = [];
  Object.keys(data).map(async (item) => {
    var link = data[item].url.split("in/")[1];
    await getProfile([link])
      .then((doc) => {
        Profiles.push(doc);
      })
      .then(() => {
        res.send(Profiles);
      })
      .catch((err) => {
        console.error(err);
        res.send({ error: err.message });
      });
  });
};

module.exports = {
  getInfo,
};
