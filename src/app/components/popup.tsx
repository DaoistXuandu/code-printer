export default function PopUp({ statusInfo, textInfo }: { statusInfo: string, textInfo: string }) {
    return (
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
    )
}