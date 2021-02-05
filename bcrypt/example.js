const bcrypt = require("bcrypt");
const saltRounds = 10;

const plainPassword1 = "Popino is love";

const salt = bcrypt.genSaltSync(saltRounds);
const hash1 = bcrypt.hashSync(plainPassword1, salt);

console.log("Hash 1 -", hash1);