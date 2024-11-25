import { SignIn } from "@clerk/clerk-react"

export default function SignInPage() {
  return (
    <div >
      <div className="flex justify-center items-center border h-[700px]">
      <div className="text-center">
        <SignIn appearance={{
          variables: {
            colorPrimary: "rgb(247 201 115)",
            colorTextOnPrimaryBackground: "black",
            colorText: "black"
          }
        }} /></div>
      </div>
    </div>
  )
}