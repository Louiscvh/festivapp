import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if(req.method == "POST") {
        const { email, password } = JSON.parse(req.body)
        try {
            const response = await prisma.user.findUnique({
                where: {
                    email,
                },
                select : {
                    id: true,
                    avatar: true,
                    birth: true,
                    password: true,
                    role: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                }
            })
            if(!response) {
                res.status(500).json("Aucun utilisateur à été trouvé")
                await prisma.$disconnect()
            }
            if(await bcrypt.compare(password, response.password)){
                const secureUser = {
                    id: response.id,
                }
                res.status(200).json(secureUser)
                await prisma.$disconnect()
            } else {
                res.status(500).json("Le mot de passe est incorrect")
                await prisma.$disconnect()
            }
            
        }catch (e) {
            res.status(500).send("Une erreur est survenue")
        }
    }
}