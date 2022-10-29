const ajvInstance = require("./ajv-instance");

// IT IS THE MAIN SCHEMA
const userSchema = {
  type: "object",
  properties: {
    userName: { type: "string", minLength: 4 },
    password: { type: "string", minLength: 5, maxLength: 12 },
    batch: { type: "number" },
    degree: { type: "string" }, // minLength: 1, maxLength: 10
    section: { type: "string", minLength: 1, maxLength: 1 },
    role: {
      type: "string",
      minLength: 4,
    },
  },
  required: ["userName", "password", "role", "batch", "degree", "section"],
};

module.exports = ajvInstance.compile(userSchema);
