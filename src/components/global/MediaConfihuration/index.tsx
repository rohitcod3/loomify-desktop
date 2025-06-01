import { SourceDeviceStateProps } from "@/hooks/useMediaSource"
import { useStudioSettings } from "@/hooks/useStudioSettings"
import { Loader } from "../Loader"
import { Monitor } from "lucide-react"

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

  const activeScreen = state.displays?.find(
    (screen) => screen.id === user?.studio?.screen)

  const activeAudio = state.audioInputs?.find(
    (device) => device.deviceId === user?.studio?.mic)

    if (!user || !user.studio || !state.displays?.[0] || !state.audioInputs?.[0]) return null;

   const {isPending, onPreset,register} = useStudioSettings(
    user!.id,
    user?.studio?.screen || state.displays?.[0].id,
    user?.studio?.mic || state.audioInputs?.[0].deviceId,
    user?.studio?.preset,
    user?.subscription?.plan

   )
  return (
    <form className='flex h-full relative w-full flex-col gap-y-5'>
       {isPending && <div className="fixed z-50 w-full top-0 left-0 right-0 bottom-0 rounded-2xl h-full bg-black/80 flex justify-center items-center">
       <Loader/>
       </div>}
       <div className="flex gap-x-5 justify-center items-center">
        <Monitor
        fill="#575655"
        color="#575655"
        size={36}
        />
        <select
        {...register("screen")}
        className="outline-none cursor-pointer px-5 rounded-xl border-2 bg-transparent w-full"
        >
        {state.displays?.map((display,key)=>(
<option
selected={activeScreen && activeScreen.id == display.id}
value={display.id}
className="bg-[#1717171 cursor-pointer"
key={key}
>
  {display.name}
</option>
        ))}
        </select>
       </div>
    </form>
  )
}

export default MediaConfiguration