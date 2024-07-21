"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Sidebar({ logInformation, attemptValue, adminStatus }: { logInformation: number, attemptValue: (attempt: number) => void, adminStatus: (status: boolean) => void }) {
    const [start, setStart] = useState(0)
    const [attempt, setAttempt] = useState(0)
    const [admin, setAdmin] = useState(false)

    const router = useRouter()

    const infoColour = { "red": "#E74C3C", "green": "#2ECC71", "darkGray": "#5C7080", "gray": "#2F424D", "mediumGray": "#3D505C", "grayFont": "#C7D0D8" }
    async function getAttempt() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LINK}/getAttempt`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(jsonFile => {
                attemptValue(jsonFile.attempt)
                setAttempt(jsonFile.attempt)
            })
    }

    async function getAdminAccess() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LINK}/checkAdmin`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(jsonFile => {
                if (jsonFile.admin) {
                    adminStatus(true)
                    setAdmin(true)
                }
            })
    }

    useEffect(() => {
        getAdminAccess()
        getAttempt()
    }, [start])

    return (
        <div>
            <div style={{ cursor: "pointer", backgroundColor: infoColour.gray, borderWidth: "0.5px", color: infoColour.grayFont }} className="h-fit w-full rounded border border-black">
                <div className="text-2xl p-3 font-bold">
                    Menu
                </div>
                <div className="border border-black border-r-0 border-l-0 border-b-0 border-0.5">
                    <div
                        style={{ fontWeight: (logInformation == 1 ? "" : "bold") }}
                        className={`w-full h-fit flex text-xl flex flex-row items-center p-3 ${logInformation == 0 ? "bg-slate-600" : "bg-transparent hover:bg-slate-600"}`}
                        onClick={e => router.push("/pages/print")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                        </svg>
                        <div className="ml-2">
                            Code Printer
                        </div>
                    </div>
                    <div
                        style={{ borderColor: "#202A33" }}
                        className={`p-3 rounded-bl rounded-br ${logInformation == 1 ? "bg-slate-600" : "bg-transparent hover:bg-slate-600"}`}
                        onClick={e => router.push("/pages/log")}
                    >
                        <div style={{ fontWeight: (logInformation == 0 ? "" : "bold") }} className="w-full h-fit flex text-xl flex flex-row items-center">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                                </svg>
                            </div>
                            <div className="ml-2">
                                Log History
                            </div>
                        </div>
                        <div style={{ fontSize: 12, color: "#EC7063", display: (admin ? "none" : "flex") }} className="mt-0">
                            {attempt}/20 attempt
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}