"use client"

import Footer from "@/app/components/footer"
import NavBar from "@/app/components/navbar"
import Sidebar from "@/app/components/sidebar"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"


export default function Log() {

    const [user, setUser] = useState("Admin")
    const [data, setData] = useState([["1234", "DDDD", 1, "5 mins ago"], ["1235", "DDDD", 2, "4 mins ago"], ["1236", "DDDD", 0, "1 mins ago"]])

    const router = useRouter()

    let infoColour = { "red": "#E74C3C", "green": "#2ECC71", "lightGray": "#3E515F", "gray": "#3A4A59" }
    let columnName = ["No", "ID", "Team Name", "Status", "Time", "History"]

    let statusColor = ["#2C3E50", "#D9822B", "#248551"]

    function handleSelectChange(e: EventTarget, index: number) {
        if (e instanceof HTMLSelectElement) {
            const newData = data.map((col, currentIndex) => {
                if (index != currentIndex) return [...col]
                else {
                    const currentColumn = col
                    currentColumn[2] = parseInt(e.value)
                    return currentColumn
                }
            })
            setData(newData)
        }
    }

    return (
        <div style={{ backgroundColor: "#3A4A59" }} className="w-full min-h-screen h-fit">
            <NavBar />
            <div className="flex flex-row w-full pl-16 mt-10 pr-16 h-fit">
                <div className="w-1/4 select-none">
                    <Sidebar logInformation={1} />
                </div>
                <div className="w-3/4 h-full w-full pl-6 text-slate-100">
                    <table className="w-full">
                        <tbody>
                            <tr className="border border-1 flex flex-row border-slate-500 w-1/1">
                                <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-1/12">{columnName[0]}</td>
                                <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-2/12 border border-slate-500">{columnName[1]}</td>
                                <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-3/12 border border-slate-500">{columnName[2]}</td>
                                <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-3/12 border border-slate-500">{columnName[3]}</td>
                                <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-2/12 border border-slate-500">{columnName[4]}</td>
                                <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-1/12 border border-slate-500">{columnName[5]}</td>
                            </tr>
                            {data.map((col, index) => (
                                <tr className={`border border-1 flex flex-row border-slate-500 w-1/`} style={{ backgroundColor: (index % 2 == 0 ? infoColour.lightGray : "") }}>
                                    <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-1/12">{index + 1}</td>
                                    <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-2/12 border border-slate-500">{col[0]}</td>
                                    <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-3/12 border border-slate-500">{col[1]}</td>
                                    <td className="relative border-t-0 border-b-0 border-r-0 flex justify-start items-center w-3/12 border border-slate-500">
                                        <select
                                            disabled={(user != "Admin")}
                                            style={{ appearance: "none", backgroundColor: (typeof col[2] == "number" ? statusColor[col[2]] : statusColor[0]), backgroundPosition: "center" }}
                                            className="text-sm m-1 pl-6 pr-6 p-2 rounded-full w-full flex items-center "
                                            value={col[2].valueOf()}
                                            onChange={e => handleSelectChange(e.target, index)}
                                        >
                                            <option value="0">
                                                Pending
                                            </option>
                                            <option value="1">
                                                Printed
                                            </option>
                                            <option value="2">
                                                Delivered
                                            </option>
                                        </select>
                                        <svg style={{ pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 absolute right-0 mr-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </td>
                                    <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-2/12 border border-slate-500">{col[3]}</td>
                                    <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-1/12 border border-slate-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }} fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#47A9E7" className="size-6" onClick={e => router.push("/pages/log/code")}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div >
    )


}