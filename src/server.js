import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { canvaApiClient } from './api-client.js';
import { schemas } from './schemas.js';
import { resources } from './resources.js';

// Create an MCP server for Canva API
const server = new McpServer({
  name: "Canva API",
  version: "1.0.0",
  description: "MCP Server for interacting with Canva's API"
});

// Register all tools
// Design tools
server.tool(
  "get_design",
  { designId: schemas.designId },
  async ({ designId }) => {
    try {
      const result = await canvaApiClient.getDesign(designId);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  },
  { description: "Get information about a specific design" }
);

server.tool(
  "list_designs",
  { 
    limit: schemas.limit.optional(), 
    startAfter: schemas.startAfter.optional() 
  },
  async ({ limit, startAfter }) => {
    try {
      const result = await canvaApiClient.listDesigns(limit, startAfter);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  },
  { description: "List designs with optional pagination" }
);

// Brand tools
server.tool(
  "get_brand",
  { brandId: schemas.brandId },
  async ({ brandId }) => {
    try {
      const result = await canvaApiClient.getBrand(brandId);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  },
  { description: "Get information about a specific brand" }
);

server.tool(
  "list_brands",
  { 
    limit: schemas.limit.optional(), 
    startAfter: schemas.startAfter.optional() 
  },
  async ({ limit, startAfter }) => {
    try {
      const result = await canvaApiClient.listBrands(limit, startAfter);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  },
  { description: "List brands with optional pagination" }
);

// Asset tools
server.tool(
  "get_asset",
  { assetId: schemas.assetId },
  async ({ assetId }) => {
    try {
      const result = await canvaApiClient.getAsset(assetId);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  },
  { description: "Get information about a specific asset" }
);

server.tool(
  "list_assets",
  { 
    limit: schemas.limit.optional(), 
    startAfter: schemas.startAfter.optional(),
    type: schemas.assetType.optional()
  },
  async ({ limit, startAfter, type }) => {
    try {
      const result = await canvaApiClient.listAssets(limit, startAfter, type);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  },
  { description: "List assets with optional filtering and pagination" }
);

server.tool(
  "upload_image",
  { 
    url: schemas.imageUrl,
    title: schemas.title.optional(),
    brandId: schemas.brandId.optional()
  },
  async ({ url, title, brandId }) => {
    try {
      const result = await canvaApiClient.uploadImage(url, title, brandId);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  },
  { description: "Upload an image to Canva from a URL" }
);

// User tools
server.tool(
  "get_user",
  { userId: schemas.userId },
  async ({ userId }) => {
    try {
      const result = await canvaApiClient.getUser(userId);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  },
  { description: "Get information about a specific user" }
);

server.tool(
  "list_users",
  { 
    limit: schemas.limit.optional(), 
    startAfter: schemas.startAfter.optional() 
  },
  async ({ limit, startAfter }) => {
    try {
      const result = await canvaApiClient.listUsers(limit, startAfter);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  },
  { description: "List users with optional pagination" }
);

// Register all resources
server.resource(
  "canva_docs",
  new ResourceTemplate("canva://{section}", { list: undefined }),
  resources.documentationResource
);

server.resource(
  "canva_design",
  new ResourceTemplate("canva://design/{designId}", { list: undefined }),
  resources.designResource
);

server.resource(
  "canva_brand",
  new ResourceTemplate("canva://brand/{brandId}", { list: undefined }),
  resources.brandResource
);

server.resource(
  "canva_asset",
  new ResourceTemplate("canva://asset/{assetId}", { list: undefined }),
  resources.assetResource
);

export { server };
