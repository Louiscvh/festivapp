import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST") {
        const {description, content, location, userId, festival} = JSON.parse(req.body)
        console.log(description, content, location, userId, festival)
        if(description || content || location) {
            try {
                const request = await prisma.post.create({
                    data : {
                        description,
                        content,
                        location,
                        author: {
                            connect: {
                                id: userId
                            }
                        },
                        festival: {
                            connect: {
                                id: parseInt(festival)
                            }
                        }
                    }
                })
                res.status(200).json('Votre post a bien été créé')
            } catch(e) {
                console.log(e)
            }
        } else {
            res.status(400).json('Veuillez remplir tous les champs !')
        }
        
      
    }
}