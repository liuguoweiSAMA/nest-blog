import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { Random } from 'mockjs'
// import { create } from '../helper';
const prisma = new PrismaClient()
async function run() {
  await prisma.user.create({
    data: {
      name: 'admin',
      password: await hash('admin'),
    },
  })
  for (let i = 0; i < 50; i++) {
    await prisma.article.create({
      data: {
        title: Random.ctitle(10, 30),
        content: Random.cparagraph(30, 50),
      },
    })
  }
}
run()
