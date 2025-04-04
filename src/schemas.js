import { z } from 'zod';

export const schemas = {
  // Common schemas
  designId: z.string().describe("The unique identifier for a design"),
  brandId: z.string().describe("The unique identifier for a brand"),
  assetId: z.string().describe("The unique identifier for an asset"),
  userId: z.string().describe("The unique identifier for a user"),
  limit: z.number().min(1).max(100).default(50).describe("Number of items to return (1-100)"),
  startAfter: z.string().describe("Token for pagination"),
  title: z.string().describe("Title for the resource"),
  
  // Asset specific schemas
  assetType: z.enum(['IMAGE', 'VIDEO', 'AUDIO', 'FONT']).describe("Type of asset"),
  imageUrl: z.string().url().describe("URL of the image to upload"),
  
  // Documentation section schema
  docSection: z.enum([
    'overview', 
    'getting-started', 
    'authentication', 
    'designs', 
    'brands', 
    'assets', 
    'users'
  ]).describe("Section of Canva API documentation")
};
