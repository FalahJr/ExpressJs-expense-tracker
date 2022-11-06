import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createFinancialRecord = async (req, res) => {
  const { money, status, description } = req.body;
  const { user_id } = req.user;
  try {
    if (!money) {
      return res.status(400).json({ error: "Nominal uang harus di isi" });
    } else if (!status) {
      return res.status(400).json({ error: "Status harus di isi" });
    } else if (!description) {
      return res.status(400).json({ error: "Deskripsi harus di isi" });
    }
    const data = await prisma.financial_Record.create({
      data: {
        money: money,
        status: status,
        description: description,
        user_id: user_id,
      },
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const showFinancialRecord = async (req, res) => {
  const { user_id } = req.user;
  try {
    const data = await prisma.financial_Record.findMany({
      where: {
        user_id: user_id,
      },
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateFinancialRecord = async (req, res) => {
  const { money, status, description } = req.body;

  const { user_id } = req.user;
  try {
    // if (!money) {
    //   return res.status(400).json({ error: "Nominal uang harus di isi" });
    // } else if (!status) {
    //   return res.status(400).json({ error: "Status harus di isi" });
    // }else if (!description) {
    //   return res.status(400).json({ error: "Deskripsi harus di isi" });
    // }
    const data = await prisma.financial_Record.updateMany({
      where: {
        id: Number(req.params.id),
        user_id: user_id,
      },
      data: {
        money: money,
        status: status,
        description: description,
        user_id: user_id,
      },
    });
    if (data.count === 0)
      return res.status(401).json({ error: "Gagal Update" });

    res.status(201).json({ success: "Transaksi berhasil di update" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteFinancialRecord = async (req, res) => {
  const { user_id } = req.user;
  try {
    const data = await prisma.financial_Record.deleteMany({
      where: {
        id: Number(req.params.id),
        user_id: user_id,
      },
    });
    if (data.count === 0)
      return res.status(401).json({ error: "Gagal Menghapus" });

    res.status(201).json({ success: "Menghapus Transaksi berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
