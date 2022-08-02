import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST") {
        const {commentId} = JSON.parse(req.body)
        if(commentId) {
            try {
                await prisma.comment.delete({
                    where : {
                        id: Number(commentId)
                    }
                })
                res.status(200).json('Le commentaire a bien été supprimé')
            } catch(e) {
                console.log(e)
            }
        } else {
            res.status(400).json('Erreur')
        }
    }
}