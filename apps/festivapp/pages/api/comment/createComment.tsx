import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST") {
        const {comment, postId, authorId} = JSON.parse(req.body)
        console.log(comment, postId, authorId)
        if(comment) {
            try {
                await prisma.comment.create({
                    data: {
                        content: comment,
                        post: {
                            connect: {
                                id: postId
                            }
                        },
                        author: {
                            connect: {
                                id: authorId
                            }
                        }
                    }
                  })
                res.status(200).json('Votre commentaire a été ajouté')
            } catch(e) {
                console.log(e)
            }
        } else {
            res.status(400).json('Un commentaire ne peut pas être vide !')
        }
        
      
    }
}