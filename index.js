const app = require("./src/config/app");
require("./src/config/db");

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on PORT: ${port}`));
