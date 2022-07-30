import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await prisma.$connect()
    if(req.method == "POST") {
        const {postId, userId} = JSON.parse(req.body)
        const request = await prisma.like.findFirst({
            where: {
                postId : Number(postId),
                authorId : Number(userId),
            }
        })
        if(request) {
            const likeExist = request.id
            await prisma.like.delete({
                where: {
                    id: likeExist,
                }
            })
            res.status(200).json('Vous avez supprimé votre like')
        } else {
            await prisma.like.create({
                data: {
                    post: {
                        connect: {
                            id: postId
                        }
                    },
                    author: {
                        connect: {
                            id: userId
                        }
                    }
                }
            })
            res.status(200).json('Vous avez liké ce post')
        }
    }
}