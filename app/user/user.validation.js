const z = require("zod");

const userSchema = z.object({
  email: z.string(),
  password: z.string(),
});

module.exports = {
    userSchema
}
