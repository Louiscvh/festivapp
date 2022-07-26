import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Signin(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST") {
        const { firstName, lastName, birth, email, password} = JSON.parse(req.body)
        if(!firstName || !lastName || !birth || !email || !password) {
            res.status(500).json('Veuillez remplir tous les champs')
        }
        try {
            const response = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    birth,
                    email,
                    avatar: '/img/user.webp',
                    password: await bcrypt.hash(password, 10),
                    role: "USER",
                },
            })
            const formatResponse = {
                id: response.id,
            }
            res.status(200).json(formatResponse)
        }catch (e) {
            res.status(500).json("Cet email est déjà utilisé")
        }
    }
  
}