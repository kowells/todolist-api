const prisma = require("../utils/prisma");
const { hashPassword } = require("../utils/hash");
const { userSchema } = require("../user/user.validation");

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({
      success: true,
      message: "Get data all user success",
      data: users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Get data all user failed",
    });
  }
};

// const getUserId = async (req, res) => {
//     try {

//     } catch (error) {

//     }
// }

const addUser = async (req, res) => {
  try {
    const userValid = userSchema.safeParse(req.body);

    if (!userValid.success) {
      const errorMessage = userValid.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res.json({
        success: false,
        message: errorMessage,
        data: null,
      });
    }

    const { email, password } = userValid.data;

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created",
      data: newUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Create user failed",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });

    await prisma.user.delete({
      where: {
        id: Number.parseInt(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Delete user success",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Delete user failed",
    });
  }
};

//belum test
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = generateToken({ userId: user.id });
    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  loginUser,
};
