// index.js
const bcrypt = require("bcrypt");

(async () => {
  const saltRounds = 10;
  const hash = await bcrypt.hash("adminpass", saltRounds);
  console.log("Hash do admin:", hash);
})();
