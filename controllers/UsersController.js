import { PrismaClient } from "@prisma/client";
import { hash, compare } from "../helpers/bcrypt.js";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "name harus di isi" });
    } else if (!email) {
      return res.status(400).json({ error: "Email harus di isi" });
    } else if (!password) {
      return res.status(400).json({ error: "Password harus di isi" });
    }
    const password_hash = await hash(password);
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: password_hash,
      },
    });
    delete user.password;
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ error: "Email harus di isi" });
    } else if (!password) {
      return res.status(400).json({ error: "Password harus di isi" });
    }
    const encrypted = await hash(password);

    const data = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (data === null) {
      return res.status(404).json({ error: "Data tidak ditemukan" });
    }

    if (!(await compare(password, data.password))) {
      return res.status(500).json({ error: "password salah" });
    } else {
      delete data.password;
      const token = jwt.sign({ ...data }, jwt_secret, { expiresIn: "24h" });
      return res.status(201).json({ ...data, token: token });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const showUser = async (req, res) => {
  try {
    const data = await prisma.users.findMany();
    delete data.password;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { email, password, name } = req.body;

  const password_hash = await hash(password);
  try {
    if (!name) {
      return res.status(400).json({ error: "Username harus di isi" });
    } else if (!email) {
      return res.status(400).json({ error: "Email harus di isi" });
    } else if (!password) {
      return res.status(400).json({ error: "Password harus di isi" });
    }
    const user = await prisma.users.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: name,
        email: email,
        password: password_hash,
      },
    });
    delete user.password;
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await prisma.User.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(201).json({ msg: "Data User Terhapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
