import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    res.end(`Post: ${id}`)
}