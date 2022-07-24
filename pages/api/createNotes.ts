import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const CreateNote = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content } = req.body;

  try {
    await prisma.note.create({ data: { title, content } });
    res.status(201).json({ message: "Note created" });
  } catch (error) {
    console.log(error);
  }
};

export default CreateNote;
