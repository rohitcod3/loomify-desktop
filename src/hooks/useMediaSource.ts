import { useReducer } from "react"


export type SourceDeviceStateProps = {
    displays?:{
        appIcon: null
        display_id: string
        id:string
        name:string
        thumbnail: unknown[]
    }[]
    audioInputs?:{
        deviceId:string
        kind:string
        label:string
        groupId:string
    }[]
    error?: string | null
    isPending?: boolean
}

export const useMediaSources = () => {
    const [state, action] = useReducer((state:SourceDeviceStateProps) => {},)
}