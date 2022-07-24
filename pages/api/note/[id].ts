import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const noteId = req.query.id;
  const { title, content } = req.body;
  console.log(noteId, title, content);
  if (req.method === "DELETE") {
    const note = await prisma.note.delete({
      where: { id: String(noteId) },
    });
    res.json(note);
  } else {
    const note = await prisma.note.update({
      data: {
        title,
        content,
      },
      where: { id: String(noteId) },
    });
    res.json(note);
  }
};

export default Handler;
