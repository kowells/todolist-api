const prisma = require("../utils/prisma");
const { todoSchema } = require("../todo/todo.validation");

const getAllTodo = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    return res.status(200).json({
      success: true,
      message: "Get all todo success",
      data: todos,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Get all todo failed",
    });
  }
};

const addTodo = async (req, res) => {
  try {
    const parse = todoSchema.safeParse(req.body);
    const userId = req.user.id;

    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res.json({
        success: false,
        message: errorMessage,
        data: null,
      });
    }

    const todo = await prisma.todo.create({
      data: {
        title: parse.data.title,
        completed: parse.data.completed,
        userId: userId,
      },
    });
    return res.status(201).json({
      success: true,
      message: "Create todo success",
      data: todo,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Create todo failed",
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const parse = todoSchema.safeParse(req.body);

    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res.json({
        success: false,
        message: errorMessage,
        data: null,
      });
    }

    const todo = await prisma.todo.update({
      where: {
        id: Number.parseInt(id),
      },
      data: {
        title: parse.data.title,
        completed: parse.data.completed,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Update todo success",
      data: todo,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Update todo failed",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await prisma.todo.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });

    await prisma.todo.delete({
      where: {
        id: Number.parseInt(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Delete todo success",
      data: todo,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Delete todo failed",
    });
  }
};

module.exports = {
  getAllTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
