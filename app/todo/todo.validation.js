const z = require("zod");

const todoSchema = z.object({
  title: z.string(),
  completed: z.boolean(),
});

module.exports = { todoSchema };
