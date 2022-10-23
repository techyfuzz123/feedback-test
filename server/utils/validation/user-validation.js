const ajvInstance = require("./ajv-instance");



// IT IS THE MAIN SCHEMA
const userSchema = {
  type: "object",
  properties: {
    userName: { type: "string", minLength: 4 },
    password: { type: "string", minLength: 5, maxLength: 10 },
  },
  required: ["userName", "password"],
};



module.exports = ajvInstance.compile(userSchema);

