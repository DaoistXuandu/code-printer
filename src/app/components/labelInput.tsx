"use client"

type ChangeValueFunction = (value: string) => void;

export default function LabelInput({ changeValue, label }: { changeValue: ChangeValueFunction, label: string }) {
    return (
        <div className="flex flex-col">
            <div className="font-bold">
                {label}
            </div>
            <input
                type="text"
                className="text-black text-sm p-2 rounded mt-1"
                placeholder={label}
                onChange={e => changeValue(e.target.value)} />
        </div>
    )
}