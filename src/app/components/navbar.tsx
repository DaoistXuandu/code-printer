"use client"

import { useRouter } from "next/navigation";

export default function NavBar({ status = false }) {
    const router = useRouter()

    async function handleLog() {
        if (status == true) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/logout`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
        router.push("/pages/login")
    }

    return (
        <div style={{ backgroundColor: "#0C5174", color: "#C6CFD7" }} className="flex flex-row w-full h-fit pt-2.5 pb-2.5 pl-16 pr-16 items-center drop-shadow-md select-none">
            <div className="w-3/4 flex justify-start items-center">
                <div className="text-3xl font-bold">CPC 16</div>
                <div className="flex flex-row font-light items-center">
                    <p style={{ color: "#346A88" }} className="ml-3 mr-3"> | </p>
                    <p className="text-sm">Printing Site</p>
                </div>
            </div>
            <div style={{ cursor: "pointer" }} className="w-1/2 flex justify-end text-sm" onClick={handleLog}>
                <div className="border border-t-0 border-l-0 border-r-0 border-transparent hover:border-white hover:text-white p-0.5 select-none">
                    Log
                    {
                        status ? " Out" : " In"
                    }
                </div>
            </div>
        </div >
    )
}

