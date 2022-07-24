import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const noteId = req.query.id;
  const { title, content } = req.body;

  if (req.method === "DELETE") {
    const note = await prisma.note.delete({
      where: { id: String(noteId) },
    });
    res.json(note);
  }
  if (req.method === "PUT") {
    const note = await prisma.note.update({
      where: { id: String(noteId) },
      data: {
        title,
        content,
      },
    });
    res.json(note);
  }
};

export default Handler;
