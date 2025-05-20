import { ClerkLoading, SignedIn, useUser } from "@clerk/clerk-react"
import { Loader } from "../Loader";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/lib/utils";
import { useMediaSources } from "@/hooks/useMediaSource";
import MediaConfiguration from "../MediaConfihuration";

function Widget() {
    const [profile, setProfile] = useState<{
        status:number
        user: | ({
            subscription:{
                plan:"PRO" | 'FREE'
            } |  null
            studio:{
                id:string
                screen: string | null
                mic: string | null
                preset: string | null
                camera: string | null
                userId: string | null
            } | null
            
        } & {
            id : string
            email : string
            firstname:string | null
            lastname: string | null
            createdAt: Date
            clerkid: string
        }
    
    ) | null
    } | null>(null)

    const {user} = useUser();

    const {state, fetchMediaResources} = useMediaSources()
console.log(state)
    useEffect(() => { 
        if(user && user.id){
            fetchUserProfile(user.id).then((p) => setProfile(p))
        }

    }, [user])
    
  return (
    <div className="p-5">
         <ClerkLoading>
            <div className="h-full flex justitfy-center items-center">
                <Loader/>
            </div>
         </ClerkLoading>
         <SignedIn>
            {profile ? 
            (<MediaConfiguration
            
            /> )
            : 
            (
                <div className="w-full flex justify-center items-center">
                    <Loader/>
                </div>
            )
            }
         </SignedIn>
    </div>
  )
}

export default Widget