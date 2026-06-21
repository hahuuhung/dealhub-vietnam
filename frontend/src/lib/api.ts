import axios from 'axios';

// ==========================================
// CONFIGURATION
// ==========================================
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ==========================================
// CLIENT-SIDE AXIOS INSTANCE (With JWT Interceptor)
// ==========================================
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attach JWT token to headers
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('dealhub_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response Interceptor: Handle Global Errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Token expired or invalid
      localStorage.removeItem('dealhub_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==========================================
// SERVER-SIDE FETCH WRAPPERS (For App Router Server Components)
// ==========================================

export async function fetchFeaturedDeals() {
  try {
    const res = await fetch(`${API_BASE_URL}/deals/featured`, {
      next: { revalidate: 600 } // Cache for 10 minutes
    });
    if (!res.ok) throw new Error('Failed to fetch featured deals');
    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function fetchNearbyDeals() {
  try {
    const res = await fetch(`${API_BASE_URL}/deals/nearby`, {
      cache: 'no-store' // Dynamic for nearby
    });
    if (!res.ok) throw new Error('Failed to fetch nearby deals');
    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function fetchDealById(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/deals/${id}`, {
      next: { revalidate: 60 } 
    });
    if (!res.ok) throw new Error('Failed to fetch deal details');
    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

export async function fetchDeals(category?: string, search?: string) {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/deals?${params.toString()}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch deals');
    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}
