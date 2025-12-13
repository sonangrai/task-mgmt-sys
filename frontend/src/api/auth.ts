import axios from 'axios'
import { AuthError, createClient, type Session } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
)

export const getProfileAPI = async () => {
  const res = await axios.post(`${ENDPOINT}/user`)
  return res
}

export const loginAPI = async (email: string) => {
  try {
    const res = await supabase.auth.signInWithOtp({
      email: email,
    })
    if (res.error) throw res
    return res
  } catch (error) {
    return error
  }
}

export const verifyAPI = async ({
  email,
  otp,
}: {
  email: string
  otp: string
}) => {
  try {
    const res = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: 'email',
    })
    if (res.error) throw res
    return res
  } catch (error) {
    return error
  }
}

export const logoutAPI = async () => {
  try {
    const res = await supabase.auth.signOut()

    if (res.error) throw res
    return res
  } catch (error) {
    return error
  }
}

type SessionRes =
  | {
      data: {
        session: Session
      }
      error: null
    }
  | {
      data: {
        session: null
      }
      error: AuthError
    }
  | {
      data: {
        session: null
      }
      error: null
    }

export const getUserAPI = async (): Promise<SessionRes> => {
  const res = await supabase.auth.getSession()
  return res
}
