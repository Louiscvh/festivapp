import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST") {
        const {text} = JSON.parse(req.body)
        if(text) {
            try {
                const request = await prisma.user.findMany({
                    where : {
                        OR: [
                        {
                            lastName: {
                                contains: text
                            }
                        }, {
                            firstName: {
                                contains: text
                            }
                        }]
                    }
                })
                res.status(200).json(request)
            } catch(e) {
                console.log(e)
            }
        } else {
            res.status(400).json('Erreur')
        }
    }
}