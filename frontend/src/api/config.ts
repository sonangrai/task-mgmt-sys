import { createClient } from '@supabase/supabase-js'
import axios from 'axios'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
)

export const ENDPOINT = import.meta.env.VITE_API_URL

let cachedToken: string | null = null

// Create axios instance
const axiosInstance = axios.create({
  baseURL: ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Initialize token on app load
export const initializeAuth = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  cachedToken = session?.access_token || null
}

// Listen to auth state changes
supabase.auth.onAuthStateChange((_event, session) => {
  cachedToken = session?.access_token || null
})

// Request interceptor - uses cached token
axiosInstance.interceptors.request.use(
  (config) => {
    if (cachedToken) {
      config.headers.Authorization = `Bearer ${cachedToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor - handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Only call refresh when actually needed
        const {
          data: { session },
        } = await supabase.auth.refreshSession()

        if (session?.access_token) {
          cachedToken = session.access_token
          originalRequest.headers.Authorization = `Bearer ${cachedToken}`
          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        cachedToken = null
        await supabase.auth.signOut()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance

export type TResponse<T> = {
  status: number
  data: T
  meta: null
  msg: string
}
