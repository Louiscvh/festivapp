import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "GET") {
        const { id } = req.query
        const request = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
            }
        })
        res.status(200).json(request)
    }
}