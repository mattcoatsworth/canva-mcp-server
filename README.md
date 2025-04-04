# Canva API MCP Server

A comprehensive Model Context Protocol (MCP) server for interacting with Canva's API. This server provides tools and resources for managing designs, brands, assets, and users in Canva.

## Features

- Complete coverage of Canva API endpoints
- Tools for all major API operations
- Resources for documentation and entity details
- Mock data support for testing without API credentials

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and add your Canva API credentials:
   ```
   CANVA_APP_ID=your_app_id
   CANVA_API_KEY=your_api_key
   ```
4. Start the server:
   ```
   npm run dev
   ```

## Testing with MCP Inspector

To test the server with the MCP Inspector:

```
npm run inspect
```

This will open a web interface where you can:
- Browse and test all available tools
- Access resources
- View server logs

## Available Tools

### Design Management
- `get_design` - Get information about a specific design
- `list_designs` - List designs with optional pagination

### Brand Management
- `get_brand` - Get information about a specific brand
- `list_brands` - List brands with optional pagination

### Asset Management
- `get_asset` - Get information about a specific asset
- `list_assets` - List assets with optional filtering and pagination
- `upload_image` - Upload an image to Canva from a URL

### User Management
- `get_user` - Get information about a specific user
- `list_users` - List users with optional pagination

## Available Resources

### Documentation
- `canva://overview` - General API overview
- `canva://getting-started` - Getting started guide
- `canva://authentication` - Authentication information
- `canva://designs` - Designs API documentation
- `canva://brands` - Brands API documentation
- `canva://assets` - Assets API documentation
- `canva://users` - Users API documentation

### Entity Resources
- `canva://design/{designId}` - Information about a specific design
- `canva://brand/{brandId}` - Information about a specific brand
- `canva://asset/{assetId}` - Information about a specific asset

## Mock Data

If no API credentials are provided, the server will use mock data for all responses. This is useful for testing and development.

## License

MIT
