import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "GET") {
        const { id } = req.query
        const request = await prisma.user.findMany({
            where : {
                NOT: {
                    id: Number(id)
                  },
            },
            orderBy: {
                follower: {
                  _count: 'desc',
                },
              },
              take: 10,
              select : {
                id: true,
                avatar: true,
                firstName: true,
                lastName: true,
                follower: true,
                following: true,
              }
        })
        res.status(200).json(request)
    }
}