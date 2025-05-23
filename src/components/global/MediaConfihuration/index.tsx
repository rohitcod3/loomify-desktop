import { SourceDeviceStateProps } from "@/hooks/useMediaSource"
import { useStudioSettings } from "@/hooks/useStudioSettings"

type Props = {
  state: SourceDeviceStateProps
  user: | ({
subscription:{
  plan: 'PRO' | 'FREE'
} | null
studio: {
  id:string 
  screen: string | null 
  mic : string | null 
  camera : string | null 
  preset: "HD" | 'SD'
  userId : string | null 
} | null
} & {
  id : string
  email: string
  firstname: string | null
  lastname: string | null
  createdAt: Date
  clerkid: string
}

) | null
}

function MediaConfiguration({state, user}: Props) {
   const {} = useStudioSettings()
  return (
    <form className='flex h-full relative w-full flex-col gap-y-5'>
       
    </form>
  )
}

export default MediaConfiguration