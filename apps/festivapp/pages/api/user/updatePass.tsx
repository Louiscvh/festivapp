import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    const { oldPass, password, userId } = JSON.parse(req.body);
    console.log(oldPass, password, userId)
    if (oldPass || password) {
      try {
        const user = await prisma.user.findFirst({
          where: {
            id: Number(userId),
          },
          select: {
            password: true,
          },
        });
        if (user?.password && bcrypt.compareSync(oldPass, user.password)) {
          try {
            await prisma.user.update({
              where: {
                id: Number(userId),
              },
              data: {
                password: bcrypt.hashSync(password, 10),
              },
            });
            res.status(200).json('Votre mot de passe à bien été mis à jour');
          } catch (e) {
            console.log(e);
          }
        } else {
            res.status(400).json('Votre ancien mot de passe est incorrect !');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      res.status(400).json('Erreur');
    }
  }
}
