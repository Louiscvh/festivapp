import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST") {
        const {userId} = JSON.parse(req.body)
        if(userId) {
            try {
                await prisma.user.delete({
                    where : {
                        id: Number(userId)
                    }
                })
                res.status(200).json('Votre compte a bien été supprimé')
            } catch(e) {
                console.log(e)
            }
        } else {
            res.status(400).json('Erreur')
        }
    }
}