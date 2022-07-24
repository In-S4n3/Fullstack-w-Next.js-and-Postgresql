import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const GetData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const notes = await prisma.note.findMany({
      select: {
        id: true,
        title: true,
        content: true,
      },
    });
    res.status(201).json(notes);
  } catch (error) {
    console.log(error);
  }
};

export default GetData;
