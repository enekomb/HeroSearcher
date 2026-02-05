import pkg from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'testuser@herosearcher.com' },
    update: {},
    create: {
      id: 'test-user-123',
      email: 'testuser@herosearcher.com',
      displayName: 'Test User',
    },
  });

  console.log('Created test user:', user.email);

  // Create some favorite heroes
  const heroes = [
    {
      name: 'Spider-Man',
      image: 'https://www.superherodb.com/pictures2/portraits/10/100/133.jpg',
      intelligence: '90',
      strength: '55',
      speed: '67',
      durability: '75',
      power: '74',
      combat: '85',
    },
    {
      name: 'Iron Man',
      image: 'https://www.superherodb.com/pictures2/portraits/10/100/85.jpg',
      intelligence: '100',
      strength: '85',
      speed: '58',
      durability: '85',
      power: '100',
      combat: '64',
    },
    {
      name: 'Batman',
      image: 'https://www.superherodb.com/pictures2/portraits/10/100/639.jpg',
      intelligence: '100',
      strength: '26',
      speed: '27',
      durability: '50',
      power: '47',
      combat: '100',
    },
    {
      name: 'Wonder Woman',
      image: 'https://www.superherodb.com/pictures2/portraits/10/100/659.jpg',
      intelligence: '88',
      strength: '100',
      speed: '79',
      durability: '100',
      power: '100',
      combat: '100',
    },
    {
      name: 'Superman',
      image: 'https://www.superherodb.com/pictures2/portraits/10/100/791.jpg',
      intelligence: '94',
      strength: '100',
      speed: '100',
      durability: '100',
      power: '100',
      combat: '85',
    },
  ];

  for (const hero of heroes) {
    const favorite = await prisma.favorite.upsert({
      where: { 
        id: `${user.id}-${hero.name.toLowerCase().replace(/\s+/g, '-')}` 
      },
      update: {},
      create: {
        id: `${user.id}-${hero.name.toLowerCase().replace(/\s+/g, '-')}`,
        userId: user.id,
        name: hero.name,
        image: hero.image,
        intelligence: hero.intelligence,
        strength: hero.strength,
        speed: hero.speed,
        durability: hero.durability,
        power: hero.power,
        combat: hero.combat,
      },
    });

    console.log('Created favorite hero:', favorite.name);
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
