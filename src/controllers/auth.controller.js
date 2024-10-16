import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {createAccessToken} from "../libs/jwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // console.log(newUser);

    const userSaved = await newUser.save();

    const token =  await createAccessToken({id: userSaved._id})

    res.cookie('token', token)
    // res.json({
    //   message: "Usuario creado con éxito",

    //  });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
      if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" });
      
    const isValidPassword = await bcrypt.compare(password, userFound.password);
      if (!isValidPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

      
    // const passwordHash = await bcrypt.hash(password, 10);

    // const newUser = new User({
    //   username,
    //   email,
    //   password: passwordHash,
    // });

    // console.log(newUser);

    // const userSaved = await newUser.save();

    const token =  await createAccessToken({id: userFound._id})

    // res.json({
      //   message: "Usuario creado con éxito",
      
      //  });
      
    res.cookie('token', token)
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};