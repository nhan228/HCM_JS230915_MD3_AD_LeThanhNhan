import userModel from "../models/user.model";

export default {

    createUser: async (req, res) => {
        try {
            const { name, des } = req.body;
            const newUser = await userModel.createUser({ name, des });
            res.json(newUser);
        } catch (err) {
            res.status(500).json({ err: "Sever bảo trì" });
        }
    },

    getAllUsers: async (req, res) => {
        try {
          const users = await userModel.getAllUsers();
          res.json(users);
        } catch (err) {
          res.status(500).json({ err: "Sever bảo trì" });
        }
      },

     getUserById: async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await userModel.getUserById(userId);
      res.json(user);
    } catch (err) {
      res.status(500).json({ err: "Server bảo trì" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { name, des } = req.body;
      console.log(req.body);
      const updatedUser = await userModel.updateUser(userId, { name, des });
      res.json({updatedUser, message: "Cập nhật thành công"});
    } catch (err) {
      res.status(500).json({ err: "Server bảo trì" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      await userModel.deleteUser(userId);
      res.json({ message: "Xóa thành công" });
    } catch (err) {
      res.status(500).json({ err: "Server bảo trì" });
    }
  },
};



