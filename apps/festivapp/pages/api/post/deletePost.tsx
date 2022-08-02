import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST") {
        const {postId} = JSON.parse(req.body)
        if(postId) {
            try {
                await prisma.post.delete({
                    where : {
                        id: Number(postId)
                    }
                })
                res.status(200).json('Votre post a bien été supprimé')
            } catch(e) {
                console.log(e)
            }
        } else {
            res.status(400).json('Erreur')
        }
    }
}