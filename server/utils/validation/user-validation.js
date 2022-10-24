const ajvInstance = require("./ajv-instance");

// IT IS THE MAIN SCHEMA
const userSchema = {
  type: "object",
  properties: {
    userName: { type: "string", minLength: 4 },
    password: { type: "string", minLength: 5, maxLength: 12 },
    role: {
      type: "string",
      minLength: 4
    },
  },
  required: ["userName", "password", "role"],
};

module.exports = ajvInstance.compile(userSchema);
