import { prisma } from "../../src/data/postgres";

export const countries = [
  { id: 1, name: 'India', populationNumber: 1409902000 },
  { id: 2, name: 'China', populationNumber: 1403426000 },
  { id: 3, name: 'Estados Unidos', populationNumber: 331800000 },
  { id: 4, name: 'Indonesia', populationNumber: 271629000 },
  { id: 5, name: 'Pakistán', populationNumber: 224654000 },
  { id: 6, name: 'Nigeria', populationNumber: 219743000 },
  { id: 7, name: 'Brasil', populationNumber: 211420000 },
  { id: 8, name: 'Bangladés', populationNumber: 181781000 },
  { id: 9, name: 'Rusia', populationNumber: 146712000 },
  { id: 10, name: 'México', populationNumber: 127792000 },
  { id: 11, name: 'Japón', populationNumber: 126045000 },
  { id: 12, name: 'Filipinas', populationNumber: 108772000 },
  { id: 13, name: 'Egipto', populationNumber: 101000000 },
  { id: 14, name: 'Etiopía', populationNumber: 100882000 },
  { id: 15, name: 'Vietnam', populationNumber: 97591000 },
  { id: 16, name: 'República del Congo', populationNumber: 89561000 },
  { id: 17, name: 'Irán', populationNumber: 83914000 },
  { id: 18, name: 'Turquía', populationNumber: 83752000 },
  { id: 19, name: 'Alemania', populationNumber: 83421000 },
  { id: 20, name: 'Tailandia', populationNumber: 68232000 },
];

async function main() {
  for (const country of countries) {
    await prisma.country.upsert({
      where: { id: country.id },
      update: country,
      create: country,
    });
  }

  console.log('Seeding completed.');
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
