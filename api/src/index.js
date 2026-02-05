import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: '../.env' });

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HeroSearcher API is running' });
});

// User endpoints
app.post('/api/users', async (req, res) => {
  try {
    const { id, email, displayName } = req.body;
    const user = await prisma.user.upsert({
      where: { id },
      update: { email, displayName },
      create: { id, email, displayName },
    });
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Favorites endpoints
app.get('/api/users/:userId/favorites', async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    
    // Transform data to match frontend expectations
    const transformedFavorites = favorites.map(fav => ({
      id: fav.id,
      name: fav.name,
      image: fav.image,
      powerstats: {
        intelligence: fav.intelligence,
        strength: fav.strength,
        speed: fav.speed,
        durability: fav.durability,
        power: fav.power,
        combat: fav.combat,
      }
    }));
    
    res.json(transformedFavorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

app.post('/api/users/:userId/favorites', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, image, powerstats } = req.body;
    
    // Check if favorite already exists
    const existing = await prisma.favorite.findFirst({
      where: { userId, name },
    });
    
    if (existing) {
      return res.status(400).json({ error: 'Favorite already exists' });
    }
    
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        name,
        image,
        intelligence: powerstats?.intelligence || null,
        strength: powerstats?.strength || null,
        speed: powerstats?.speed || null,
        durability: powerstats?.durability || null,
        power: powerstats?.power || null,
        combat: powerstats?.combat || null,
      },
    });
    
    res.json(favorite);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

app.delete('/api/favorites/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.favorite.delete({
      where: { id },
    });
    res.json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'Failed to delete favorite' });
  }
});

// Start server
app.listen(PORT, () => {
  // Server started successfully
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
