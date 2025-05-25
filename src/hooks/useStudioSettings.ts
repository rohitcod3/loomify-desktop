import { updateStudioSettingsSchema } from "@/schemas/studio-settings.schema"
import { useZodForm } from "./useZodForm"
import { useEffect, useState } from "react"
import { updateStudioSettings } from "@/lib/utils"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

export const useStudioSettings = (
    id: string,
    screen? : string | null,
    audio?: string | null,
    preset?: 'HD' | 'SD',
    plan?: 'PRO' | 'FREE'

) => {

  const [onPreset, setPreset] = useState<'HD' | 'SD' | undefined>()

  const {register,watch} = useZodForm(updateStudioSettingsSchema, {
    screen:screen!,
    audio:audio!,
    preset: preset!,
  })
  
  const {mutate, isPending} = useMutation({
mutationKey:["update-studio"],
mutationFn: (data: {
    screen:string
    id:string
    audio:string
    preset: 'HD' | 'SD'
}) => updateStudioSettings(data.id,data.screen,data.audio,data.preset),
onSuccess: (data:any) => {
    return toast(data.status === 200 ? "Success" : "Error"),{
        description:data.message,
    }
}
  })

  

  useEffect(()=>{
    if(screen && audio && preset){
        window.ipcRenderer.send("media-sources",{
            screen,
            id:id,
            audio,
            preset,
            plan,
        })
    }
  },[])

useEffect(() => {
const subscribe = watch((values) => {setPreset(values.preset)
mutate({
    screen: values.screen!,
    id,
    audio:values.audio!,
    preset:values.preset!,
})
window.ipcRenderer.send('media-sources',{
   screen: values.screen,
   id,
   audio:values.audio,
   preset:values.preset,
   plan,
})
})

return () => subscribe.unsubscribe()

}, [watch])

  return {register, isPending, onPreset}
 
}


/**
 * 🔍 useEffect Explanation — Media Sources + Mutation Logic
 *
 * 1️⃣ First useEffect ([] dependency)
 * - Runs only once when the component mounts.
 * - If initial values for screen, audio, and preset exist,
 *   sends them to the Electron main process via `ipcRenderer.send("media-sources", {...})`.
 * - Useful for initializing or restoring default media source settings on load.
 *
 * 2️⃣ Second useEffect ([watch] dependency)
 * - Subscribes to real-time form value changes using `watch()` from React Hook Form.
 * - Every time screen/audio/preset changes in the form:
 *
 *    - ✅ `setPreset(values.preset)`
 *      Updates local React state `onPreset` (can be used for UI toggles or visual feedback).
 *
 *    - ✅ `mutate({...})`
 *      Uses React Query's `useMutation` to send the updated settings to the backend.
 *      It triggers the `updateStudioSettings(...)` function with the new values.
 *      The mutation does NOT use caching — it's just for updating server-side state.
 *      On success, it shows a toast notification (e.g., "Success" or "Error").
 *
 *    - ✅ `ipcRenderer.send('media-sources', {...})`
 *      Sends the updated values to the Electron app’s main process.
 *      This syncs the UI form data with any Electron-based media behavior or recording state.
 *
 *    - ✅ `return () => subscribe.unsubscribe()`
 *      Cleans up the subscription when the component unmounts to avoid memory leaks.
 *
 * 📌 In summary:
 *    - This hook syncs form changes across: 
 *      (1) local UI state, 
 *      (2) backend server via React Query mutation, 
 *      (3) Electron's native process using ipcRenderer.
 */
