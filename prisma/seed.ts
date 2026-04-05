import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { buildSlug } from "../src/lib/slug";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const categoryNames = [
  "Gestion cultural",
  "Periodismo y opinion",
  "Tecnologia y desarrollo",
];

async function main() {
  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { slug: buildSlug(name) },
      update: { name },
      create: {
        name,
        slug: buildSlug(name),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
