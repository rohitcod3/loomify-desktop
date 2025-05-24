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
const subs
}, [watch])

  return {}
 
}