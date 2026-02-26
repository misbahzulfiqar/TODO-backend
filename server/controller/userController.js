import User from '../models/userModel.js';

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id  = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!userExist) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

  export const deleteUser = async (req, res) => {
    try{
       const id = req.params.id;
      const userExist = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!userExist) {
        return res.status(404).json({ message: 'User not found' });
        
      }
      const deletedUser = await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };
  