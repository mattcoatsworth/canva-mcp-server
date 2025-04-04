import { canvaApiClient } from './api-client.js';

// Documentation content for each section
const documentationContent = {
  overview: `# Canva API Overview

The Canva API allows you to programmatically interact with Canva's platform. You can manage designs, brands, assets, and users.

## Key Concepts

- **Designs**: Canva documents that can be created, edited, and published
- **Brands**: Collections of design assets and settings that maintain brand consistency
- **Assets**: Images, videos, fonts, and other media used in designs
- **Users**: People who have access to your Canva content

## Authentication

All API requests require authentication using an API key. See the authentication section for details.`,

  'getting-started': `# Getting Started with Canva API

To start using the Canva API:

1. Create a Canva developer account at https://www.canva.dev/
2. Register your application to get an App ID and API key
3. Use these credentials in your API requests

## Making Your First Request

All API requests should include:
- \`Authorization\` header with your API key
- \`X-Canva-App-Id\` header with your App ID
- \`Content-Type: application/json\` for POST requests`,

  authentication: `# Authentication

The Canva API uses API keys for authentication. Include your API key in the Authorization header of all requests:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

Also include your App ID in the X-Canva-App-Id header:

\`\`\`
X-Canva-App-Id: YOUR_APP_ID
\`\`\`

Keep your API key secure and never expose it in client-side code.`,

  designs: `# Designs API

The Designs API allows you to manage Canva designs.

## Endpoints

- GET /v1/designs - List designs
- GET /v1/designs/{designId} - Get a specific design
- POST /v1/designs - Create a new design
- PUT /v1/designs/{designId} - Update a design
- DELETE /v1/designs/{designId} - Delete a design

## Design Object

A design object includes:
- id: Unique identifier
- title: Design title
- createdAt: Creation timestamp
- updatedAt: Last update timestamp
- thumbnailUrl: URL to design thumbnail
- status: DRAFT or PUBLISHED`,

  brands: `# Brands API

The Brands API allows you to manage brand kits in Canva.

## Endpoints

- GET /v1/brands - List brands
- GET /v1/brands/{brandId} - Get a specific brand
- POST /v1/brands - Create a new brand
- PUT /v1/brands/{brandId} - Update a brand
- DELETE /v1/brands/{brandId} - Delete a brand

## Brand Object

A brand object includes:
- id: Unique identifier
- name: Brand name
- createdAt: Creation timestamp
- updatedAt: Last update timestamp
- colors: Brand colors
- fonts: Brand fonts
- logoUrl: URL to brand logo`,

  assets: `# Assets API

The Assets API allows you to manage design assets like images, videos, and fonts.

## Endpoints

- GET /v1/assets - List assets
- GET /v1/assets/{assetId} - Get a specific asset
- POST /v1/assets/images - Upload an image
- POST /v1/assets/videos - Upload a video
- POST /v1/assets/fonts - Upload a font
- DELETE /v1/assets/{assetId} - Delete an asset

## Asset Object

An asset object includes:
- id: Unique identifier
- title: Asset title
- type: IMAGE, VIDEO, AUDIO, or FONT
- createdAt: Creation timestamp
- url: URL to access the asset
- brandId: Associated brand (if any)`,

  users: `# Users API

The Users API allows you to manage users who have access to your Canva content.

## Endpoints

- GET /v1/users - List users
- GET /v1/users/{userId} - Get a specific user
- POST /v1/users - Invite a new user
- PUT /v1/users/{userId} - Update a user's permissions
- DELETE /v1/users/{userId} - Remove a user

## User Object

A user object includes:
- id: Unique identifier
- name: User's name
- email: User's email address
- role: User's role (ADMIN, MEMBER, etc.)
- createdAt: When the user was added`
};

export const resources = {
  // Resource handler for documentation
  async documentationResource(uri, { section }) {
    if (!documentationContent[section]) {
      return {
        contents: [{
          uri: uri.href,
          text: `Documentation section '${section}' not found. Available sections: ${Object.keys(documentationContent).join(', ')}`
        }]
      };
    }
    
    return {
      contents: [{
        uri: uri.href,
        text: documentationContent[section]
      }]
    };
  },
  
  // Resource handler for designs
  async designResource(uri, { designId }) {
    try {
      const design = await canvaApiClient.getDesign(designId);
      
      return {
        contents: [{
          uri: uri.href,
          text: `# Design: ${design.title || 'Untitled'}

ID: ${design.id}
Created: ${design.createdAt}
Updated: ${design.updatedAt}
Status: ${design.status}

${design.thumbnailUrl ? `![Thumbnail](${design.thumbnailUrl})` : 'No thumbnail available'}

## Actions
- View in Canva: https://www.canva.com/design/${designId}
- Edit design metadata using the \`update_design\` tool
- Delete this design using the \`delete_design\` tool`
        }]
      };
    } catch (error) {
      return {
        contents: [{
          uri: uri.href,
          text: `Error retrieving design: ${error.message}`
        }]
      };
    }
  },
  
  // Resource handler for brands
  async brandResource(uri, { brandId }) {
    try {
      const brand = await canvaApiClient.getBrand(brandId);
      
      return {
        contents: [{
          uri: uri.href,
          text: `# Brand: ${brand.name || 'Untitled'}

ID: ${brand.id}
Created: ${brand.createdAt}
Updated: ${brand.updatedAt}

${brand.logoUrl ? `![Logo](${brand.logoUrl})` : 'No logo available'}

## Brand Colors
${brand.colors ? brand.colors.map(color => `- ${color.name}: ${color.value}`).join('\n') : 'No colors defined'}

## Brand Fonts
${brand.fonts ? brand.fonts.map(font => `- ${font.name}: ${font.type}`).join('\n') : 'No fonts defined'}

## Actions
- View brand assets using the \`list_assets\` tool with this brandId
- Update brand using the \`update_brand\` tool
- Delete this brand using the \`delete_brand\` tool`
        }]
      };
    } catch (error) {
      return {
        contents: [{
          uri: uri.href,
          text: `Error retrieving brand: ${error.message}`
        }]
      };
    }
  },
  
  // Resource handler for assets
  async assetResource(uri, { assetId }) {
    try {
      const asset = await canvaApiClient.getAsset(assetId);
      
      return {
        contents: [{
          uri: uri.href,
          text: `# Asset: ${asset.title || 'Untitled'}

ID: ${asset.id}
Type: ${asset.type}
Created: ${asset.createdAt}
${asset.brandId ? `Brand ID: ${asset.brandId}` : 'Not associated with a brand'}

${asset.type === 'IMAGE' && asset.url ? `![Asset](${asset.url})` : ''}
${asset.url ? `URL: ${asset.url}` : 'No URL available'}

## Actions
- Use this asset in designs
- Delete this asset using the \`delete_asset\` tool`
        }]
      };
    } catch (error) {
      return {
        contents: [{
          uri: uri.href,
          text: `Error retrieving asset: ${error.message}`
        }]
      };
    }
  }
};
