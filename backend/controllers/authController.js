import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import User from "../models/User.js";

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);

    // Create a new User instance with hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHashed, // Save hashed password
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: 0,
      impressions: 0,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email : email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Optional: Generate a token (you can skip this part if you don't need token-based authentication)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    delete user.password
    
    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export { register, login };
