import { updateStudioSettingsSchema } from "@/schemas/studio-settings.schema"
import { useZodForm } from "./useZodForm"
import { useState } from "react"

export const useStudioSettings = (
    id: string,
    screen? : string | null,
    audio?: string | null,
    preset?: 'HD' | 'SD',
    plan?: 'PRO' | 'FREE'

) => {
  const {register,watch} = useZodForm(updateStudioSettingsSchema, {
    screen:screen!,
    audio:audio!,
    preset: preset!,
  })
  
  const [onPreset, setPreset] = useState<'HD' | 'SD' | undefined>()

 
}