import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Signin(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST") {
        console.log(req.body)
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
                    password: await bcrypt.hash(password, 10),
                    role: "USER",
                },
            })
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json("Cet email est déjà utilisé")
        }
    }
  
}