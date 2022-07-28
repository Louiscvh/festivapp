import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST") {
        const {followerId, followingId} = JSON.parse(req.body)
        const followExist = await prisma.follow.findFirst({
            where: {
                followerId : Number(followerId),
                followingId : Number(followingId),
            },
            select : {
                id: true
            }
        })
        if(followExist) {
            await prisma.follow.delete({
                where: {
                    id: followExist.id,
                }
            })
            res.status(200).json('Vous avez supprimé votre abonnement')
        } else {
            try {
                await prisma.follow.create({
                    data: {
                        follower: {
                            connect: {
                                id: followerId
                            }
                        },
                        following: {
                            connect: {
                                id: followingId
                            }
                        }
                    }
                })
                res.status(200).json('Vous avez suivi cet utilisateur')
            }catch (e) {
                console.log('Erreur' + e)
            }
        }
        
    }
}