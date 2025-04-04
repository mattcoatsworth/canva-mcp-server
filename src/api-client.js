import axios from 'axios';

class CanvaApiClient {
  constructor() {
    this.baseUrl = 'https://api.canva.com/v1';
    this.appId = process.env.CANVA_APP_ID;
    this.apiKey = process.env.CANVA_API_KEY;
    
    if (!this.appId || !this.apiKey) {
      console.warn('Warning: Canva API credentials not found in environment variables. Using mock data.');
    }
  }

  get headers() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'X-Canva-App-Id': this.appId,
      'Content-Type': 'application/json'
    };
  }

  async makeRequest(method, endpoint, data = null) {
    // If credentials are missing, return mock data
    if (!this.appId || !this.apiKey) {
      return this.getMockData(endpoint);
    }

    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await axios({
        method,
        url,
        headers: this.headers,
        data: data ? JSON.stringify(data) : undefined
      });
      
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Canva API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        throw new Error('No response received from Canva API');
      } else {
        throw new Error(`Error setting up request: ${error.message}`);
      }
    }
  }

  // Design endpoints
  async getDesign(designId) {
    return this.makeRequest('GET', `/designs/${designId}`);
  }

  async listDesigns(limit = 50, startAfter = null) {
    const params = new URLSearchParams();
    params.append('limit', limit);
    if (startAfter) params.append('startAfter', startAfter);
    
    return this.makeRequest('GET', `/designs?${params.toString()}`);
  }

  // Brand endpoints
  async getBrand(brandId) {
    return this.makeRequest('GET', `/brands/${brandId}`);
  }

  async listBrands(limit = 50, startAfter = null) {
    const params = new URLSearchParams();
    params.append('limit', limit);
    if (startAfter) params.append('startAfter', startAfter);
    
    return this.makeRequest('GET', `/brands?${params.toString()}`);
  }

  // Asset endpoints
  async getAsset(assetId) {
    return this.makeRequest('GET', `/assets/${assetId}`);
  }

  async listAssets(limit = 50, startAfter = null, type = null) {
    const params = new URLSearchParams();
    params.append('limit', limit);
    if (startAfter) params.append('startAfter', startAfter);
    if (type) params.append('type', type);
    
    return this.makeRequest('GET', `/assets?${params.toString()}`);
  }

  async uploadImage(url, title = null, brandId = null) {
    const data = {
      url,
      title,
      brandId
    };
    
    return this.makeRequest('POST', '/assets/images', data);
  }

  // User endpoints
  async getUser(userId) {
    return this.makeRequest('GET', `/users/${userId}`);
  }

  async listUsers(limit = 50, startAfter = null) {
    const params = new URLSearchParams();
    params.append('limit', limit);
    if (startAfter) params.append('startAfter', startAfter);
    
    return this.makeRequest('GET', `/users?${params.toString()}`);
  }

  // Mock data for testing without API credentials
  getMockData(endpoint) {
    if (endpoint.includes('/designs/')) {
      return {
        id: 'mock-design-id',
        title: 'Mock Design',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-02T00:00:00Z',
        thumbnailUrl: 'https://example.com/thumbnail.jpg',
        status: 'PUBLISHED'
      };
    } else if (endpoint.includes('/designs')) {
      return {
        designs: [
          {
            id: 'mock-design-id-1',
            title: 'Mock Design 1',
            createdAt: '2023-01-01T00:00:00Z'
          },
          {
            id: 'mock-design-id-2',
            title: 'Mock Design 2',
            createdAt: '2023-01-02T00:00:00Z'
          }
        ],
        nextPageToken: 'mock-next-page-token'
      };
    } else if (endpoint.includes('/brands/')) {
      return {
        id: 'mock-brand-id',
        name: 'Mock Brand',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-02T00:00:00Z'
      };
    } else if (endpoint.includes('/brands')) {
      return {
        brands: [
          {
            id: 'mock-brand-id-1',
            name: 'Mock Brand 1',
            createdAt: '2023-01-01T00:00:00Z'
          },
          {
            id: 'mock-brand-id-2',
            name: 'Mock Brand 2',
            createdAt: '2023-01-02T00:00:00Z'
          }
        ],
        nextPageToken: 'mock-next-page-token'
      };
    } else if (endpoint.includes('/assets/')) {
      return {
        id: 'mock-asset-id',
        title: 'Mock Asset',
        type: 'IMAGE',
        createdAt: '2023-01-01T00:00:00Z',
        url: 'https://example.com/asset.jpg'
      };
    } else if (endpoint.includes('/assets')) {
      return {
        assets: [
          {
            id: 'mock-asset-id-1',
            title: 'Mock Asset 1',
            type: 'IMAGE',
            createdAt: '2023-01-01T00:00:00Z'
          },
          {
            id: 'mock-asset-id-2',
            title: 'Mock Asset 2',
            type: 'VIDEO',
            createdAt: '2023-01-02T00:00:00Z'
          }
        ],
        nextPageToken: 'mock-next-page-token'
      };
    } else if (endpoint.includes('/users/')) {
      return {
        id: 'mock-user-id',
        name: 'Mock User',
        email: 'user@example.com',
        role: 'MEMBER'
      };
    } else if (endpoint.includes('/users')) {
      return {
        users: [
          {
            id: 'mock-user-id-1',
            name: 'Mock User 1',
            email: 'user1@example.com'
          },
          {
            id: 'mock-user-id-2',
            name: 'Mock User 2',
            email: 'user2@example.com'
          }
        ],
        nextPageToken: 'mock-next-page-token'
      };
    }
    
    return { message: 'Mock data not available for this endpoint' };
  }
}

export const canvaApiClient = new CanvaApiClient();
