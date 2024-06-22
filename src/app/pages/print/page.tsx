"use client"
import Footer from "@/app/components/footer";
import NavBar from "@/app/components/navbar";
import { useRef, useEffect, useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { materialDark, materialLight } from '@uiw/codemirror-theme-material';
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/sidebar";


export default function Print() {
    const [code, setCode] = useState("")
    const [theme, setTheme] = useState(0)
    const [attempt, setAttempt] = useState(0)
    const [statusInfo, setStatusInfo] = useState("")
    const [textInfo, setTextInfo] = useState("")

    const file = useRef<HTMLInputElement>(null);
    const router = useRouter()

    let themeGroup = [materialDark, materialLight]
    let themeGroupColor = ["#545C62", "#ABB2B9"]
    // red, green
    let infoColour = { "red": "#E74C3C", "green": "#2ECC71", "darkGray": "#5C7080", "gray": "#2F424D", "mediumGray": "#3D505C", "grayFont": "#C7D0D8" }

    function generateInfo(text: string, color: string) {
        setTextInfo(text)
        setStatusInfo(color)
        setTimeout(() => {
            setStatusInfo("")
        }, 3000)
    }

    function handleCopy() {
        navigator.clipboard.writeText(code)
        generateInfo("Succesfully Copy to Clipboard", infoColour.green)
    }

    function handleFile() {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (file) {
            const fileName = file.name.split(".")
            const extension = fileName[fileName.length - 1]

            if (extension != "cpp" && extension != "txt") {
                generateInfo("File must be in the format of .cpp or .txt", infoColour.red)
                return
            }

            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                const contents = reader.result;
                if (typeof contents === 'string') {
                    setCode(contents)
                    generateInfo("Succesfully load a file", infoColour.green)
                }
                else {
                    generateInfo("Fail to load file", infoColour.red)
                }
            };
        }
        else {
            generateInfo("Fail to load file", infoColour.red)
        }
    }


    return (
        <div style={{ backgroundColor: "#3A4A59" }} className="w-full h-screen">
            <NavBar />

            <div className="flex flex-row w-full pl-16 mt-10 pr-16 h-fit">
                <div className="flex flex-col w-1/4 select-none">
                    <Sidebar logInformation={0} />
                    <div style={{ backgroundColor: infoColour.gray, borderWidth: "0.5px", color: infoColour.grayFont }} className="mt-20 rounded border border-black">
                        <div className="text-2xl p-3 font-bold">
                            Print Info
                        </div>
                        <div className="border border-b-0 border-l-0 border-r-0 border-black border-0.5 p-3">
                            <input type="file"
                                ref={file}
                                id="fileInput"
                                style={{ cursor: "pointer" }}
                                onChange={handleFile}
                                className="
                                        block w-full text-sm text-gray-300
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-black
                                        hover:file:bg-blue-100
                                        mb-3
                                "/>
                            <button
                                onClick={e => router.push("/pages/log")}
                                style={{ backgroundColor: "#3B73B9" }}
                                className="w-full h-fit p-2 text-white rounded font-medium text-md hover:scale-90"
                            >Ask to Print</button>
                        </div>
                    </div>
                </div>
                <div className="w-3/4 h-full pl-6 flex flex-row">
                    <CodeMirror
                        height="600px"
                        value={code}
                        className="w-full"
                        onChange={e => setCode(e)}
                        theme={themeGroup[theme]}
                    />
                    <div style={{ backgroundColor: themeGroupColor[theme] }} className="p-2 h-fit w-fit rounded-tr rounded-br">
                        <div style={{ cursor: "pointer" }} className="h-fit w-fit p-1 hover:scale-90" onClick={e => setTheme(theme ^ 1)}>
                            <svg style={{ display: (theme == 0 ? "none" : "block") }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                            </svg>
                            <svg style={{ display: (theme == 1 ? "none" : "block") }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>

                        </div>
                        <div style={{ cursor: "pointer" }} className="h-fit w-fit p-1 mt-4 hover:scale-90" onClick={handleCopy}>
                            <svg style={{ display: (theme == 0 ? "none" : "block") }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ">
                                <path fill-rule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clip-rule="evenodd" />
                                <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                                <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                            </svg>

                            <svg style={{ display: (theme == 1 ? "none" : "block") }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <div style={{ display: (statusInfo == "" ? "none" : "flex"), backgroundColor: statusInfo }} className="flex flex-row fixed bottom-0 right-0 mr-10 mb-10 p-5 rounded font-bold">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </div>
                <div>
                    {textInfo}
                </div>
            </div>
        </div >
    )
}