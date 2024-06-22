"use client"

import Footer from "@/app/components/footer"
import LabelInput from "@/app/components/labelInput"
import NavBar from "@/app/components/navbar"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isPressed, setIsPressed] = useState(false)

    const router = useRouter();

    function handleSubmit() {
        setIsPressed(true)
        router.push("/pages/print")
    }

    function changeUsername(updateValue: string) {
        setUsername(updateValue)
    }

    function changePassword(updateValue: string) {
        setPassword(updateValue)
    }

    return (
        <div style={{ backgroundColor: "#3A4A59" }} className="w-full min-h-screen h-fit">
            <NavBar />
            <div className="pl-16 pr-16 w-full h-full">
                <div className="flex items-center mt-20 h-full flex flex-col">
                    <div style={{ width: "600px", backgroundColor: "#2F424D", borderWidth: "0.5px" }} className="p-5 h-fit rounded border border-black bg-rose-200">
                        <div style={{ color: "#C6CFD7" }} className="text-xl font-bold">Log In</div>
                        <form action={handleSubmit}>
                            <div style={{ borderColor: "#596D7B" }} className="border border-l-0 border-r-0 border-white pt-4 pb-4 mt-3 mb-3">
                                < LabelInput changeValue={changeUsername} label="Username" />
                                <div className="mt-3"></div>
                                < LabelInput changeValue={changePassword} label="Password" />
                            </div>

                            <button
                                style={{ backgroundColor: (!isPressed ? "#3B73B9" : "#5DADE2") }}
                                className="pr-3 pl-3 pt-2 pb-2 rounded text-sm "
                                disabled={isPressed}
                            // onClick={e => setIsPressed(true)}
                            >
                                Log In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

