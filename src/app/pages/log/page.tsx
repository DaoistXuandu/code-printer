"use client"

import Footer from "@/app/components/footer"
import NavBar from "@/app/components/navbar"
import Sidebar from "@/app/components/sidebar"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { rowData } from "@/app/lib/interface/rowData"
import { Admin } from "mongodb"

export default function Log() {
    const [user, setUser] = useState("")
    const [data, setData] = useState(new Array())
    const [admin, setAdmin] = useState(false)

    const router = useRouter()

    let infoColour = { "red": "#E74C3C", "green": "#2ECC71", "lightGray": "#3E515F", "gray": "#3A4A59" }
    let columnName = ["No", "ID", "Team Name", "Status", "Time", "History"]
    let statusColor = ["#2C3E50", "#D9822B", "#248551"]

    function getDiffrence(date: Date) {
        const currentDate = new Date()
        const contentDate = new Date(date)

        let diffrence = Math.floor((currentDate.getTime() - contentDate.getTime()) / 1000)
        let result = ""

        if (diffrence < 60) {
            result = diffrence + " seconds ago"
        }
        else {
            diffrence = Math.floor(diffrence / 60);
            if (diffrence < 60) {
                result = diffrence + " mins ago"
            }
            else {
                diffrence = Math.floor(diffrence / 60);
                result = diffrence + " hour ago"
            }
        }
        return result
    }

    function adminStatus(status: boolean) {
        if (status)
            setAdmin(true)
    }

    async function getData() {
        const username = await fetch(`${process.env.NEXT_PUBLIC_LINK}/getUsername`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(jsonFile => { return jsonFile.username })


        const first_part = username.split("_")
        let url = `${process.env.NEXT_PUBLIC_LINK}/getContentByUserId`
        if (first_part[0] == "Admin") {
            url = `${process.env.NEXT_PUBLIC_LINK}/getContent`
            setUser("Admin")
        }

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(jsonFile => { return jsonFile.content })


        const newData = new Array()
        res.forEach((element: rowData, index: number) => {
            const row = [element._id, element.teamName, element.status, element.createdAt]
            newData.push(row)
        });

        setData(newData)
    }

    async function updateStatus(id: string, status: number) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LINK}/updateStatus`, {
            method: 'PATCH',
            body: JSON.stringify({
                id: id,
                status: status
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    useEffect(() => {
        getData()
    }, [admin])

    function handleSelectChange(e: EventTarget, index: number) {
        if (e instanceof HTMLSelectElement) {
            const newData = data.map((col, currentIndex) => {
                if (index != currentIndex) return [...col]
                else {
                    const currentColumn = col
                    const value = parseInt(e.value)

                    updateStatus(currentColumn[0], value)
                    currentColumn[2] = parseInt(e.value)
                    return currentColumn
                }
            })
            setData(newData)
        }
    }

    function iterate() {
        if (!data.length) {
            return (<></>)
        }
        else {
            return (
                data.map((col, index) => (
                    <tr className={`border border-1 flex flex-row border-slate-500 w-1/`} style={{ backgroundColor: (index % 2 == 0 ? infoColour.lightGray : "") }}>
                        <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-1/12">{index + 1}</td>
                        <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-3/12 border border-slate-500 flex">{col[0]}</td>
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
                            <svg style={{ pointerEvents: "none", display: (user != "Admin" ? "none" : "flex") }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 absolute right-0 mr-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </td>
                        <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-1/12 border border-slate-500">{getDiffrence(col[3])}</td>
                        <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-1/12 border border-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }} fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#47A9E7" className="size-6" onClick={e => router.push(`/pages/log/code/${col[0]}`)}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </td>
                    </tr>
                ))
            )
        }
    }

    return (
        <div style={{ backgroundColor: "#3A4A59" }} className="w-full min-h-screen h-fit">
            <NavBar status={true} />
            <div className="flex flex-row w-full pl-16 mt-10 pr-16 h-fit">
                <div className="w-1/4 select-none">
                    <Sidebar attemptValue={(x: number) => { }} logInformation={1} adminStatus={adminStatus} />
                </div>
                <div className="w-3/4 h-full w-full pl-6 text-slate-100">
                    <table className="w-full">
                        <tbody>
                            <tr className="border border-1 flex flex-row border-slate-500 w-1/1">
                                <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-1/12">{columnName[0]}</td>
                                <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-3/12 border border-slate-500">{columnName[1]}</td>
                                <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-3/12 border border-slate-500">{columnName[2]}</td>
                                <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-3/12 border border-slate-500">{columnName[3]}</td>
                                <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-1/12 border border-slate-500">{columnName[4]}</td>
                                <td className="p-3 border-t-0 border-b-0 border-r-0 justify-start w-1/12 border border-slate-500">{columnName[5]}</td>
                            </tr>
                            {iterate()}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div >
    )


}