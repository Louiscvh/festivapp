import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "GET") {
        const { id } = req.query
        const request = await prisma.post.findFirst({
            where : {
                id: Number(id)
            },
            select: {
                id: true,
                content: true,
                description: true,
                location: true,
                createdAt: true,
                festival: {
                    select: {
                        name: true
                    }
                },
                comment : {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        author : {
                            select : {
                                firstName: true,
                                lastName: true,
                                avatar: true,
                                id: true
                            }
                        }
                    }
                },
                like: {
                    select: {
                        id: true,
                        authorId: true,
                        author: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                avatar: true,
                            }
                        }
                    }
                },
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        follower: true
                    }
                },
                authorId: true
            }
        })
        res.status(200).json(request)
    }
}