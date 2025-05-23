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
               preset: "HD" | "SD"
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
   // in your component
useEffect(() => {
  if (!user) return;
  fetchUserProfile(user.id)
    .then((data) => {
      console.log("🔍 API response for user:", data);
      setProfile(data);
    })
    .catch(console.error);
}, [user]);

    
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
            state={state}
            user={profile?.user}
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