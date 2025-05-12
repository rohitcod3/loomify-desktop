import { Button } from "@/components/ui/button"
import { SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react"

const AuthButton = () => {
    return (
        <SignedOut>
          <div className="flex gap-x-3 h-screen justify-center items-center">
           <SignInButton>
            <Button
            variant="outline"
            className="px-10 rouneded-full hover:bg-gray-200"
            >
           Sign In
            </Button>
           </SignInButton>

           <SignUpButton>
            <Button 
            className="px-10 rounded-full"
            variant="default"
            >
             Sign Up
            </Button>
           </SignUpButton>
          </div>
        </SignedOut>
    )
}

export default AuthButton