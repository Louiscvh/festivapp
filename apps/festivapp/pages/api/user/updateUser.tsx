import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST") {
        const {userId, avatar, bio, lastName, firstName} = JSON.parse(req.body)
        if(avatar || bio || lastName || firstName) {
            try {
                await prisma.user.update({
                    where : {
                        id: Number(userId)
                    },
                    data: {
                        bio: bio,
                        avatar: avatar || '/img/user.webp',
                        lastName: lastName,
                        firstName: firstName
                    }
                })
                res.status(200).json('Votre profil à bien été mis à jour')
            } catch(e) {
                console.log(e)
            }
        } else {
            res.status(400).json('Erreur')
        }
    }
}