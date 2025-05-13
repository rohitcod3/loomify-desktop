import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const httpsClient = axios.create({
  baseURL:import.meta.env.VITE_HOST_URL,
})

export const onCloseApp = () => window.ipcRenderer.send('closeApp')


export const fetchUserProfile =  async (clerkId:string) => {
const response = await httpsClient.get(`/auth/${clerkId}`, {
  headers:{
    'Content-Type': 'application/json',
  }
})
return response.data
}