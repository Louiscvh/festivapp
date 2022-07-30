import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "GET") {
        const { userId } = req.query
        const request = await prisma.post.findMany({
            where :{
                author: {
                    follower: {
                        some: {
                            followerId: Number(userId)
                        }
                    }
                }
            },
            select:{
                id: true,
                description: true,
                content: true,
                location: true,
                createdAt: true,
                like: true,
                festival: {
                    select: {
                        name: true,
                    }
                },
                comment: {
                    select: {
                        id: true,
                    }
                },
                author:{
                    select:{
                        id:true,
                        firstName:true,
                        lastName: true,
                        avatar: true,
                    }
                }
            }
            
        })
        res.status(200).json(request)
    }
}