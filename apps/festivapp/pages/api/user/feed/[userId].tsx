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
                title: true,
                description: true,
                content: true,
                author:{
                    select:{
                        firstName:true,
                        lastName: true,
                        avatar: true,
                        id:true
                    }
                }
            }
            
        })
        console.log(request, userId)
        res.status(200).json(request)
    }
}