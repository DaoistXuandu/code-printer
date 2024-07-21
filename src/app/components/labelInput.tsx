"use client"

type ChangeValueFunction = (value: string) => void;

export default function LabelInput({ changeValue, label, value }: { changeValue: ChangeValueFunction, label: string, value: string }) {
    return (
        <div className="flex flex-col">
            <div className="font-bold">
                {label}
            </div>
            <input
                type="text"
                className="text-black text-sm p-2 rounded mt-1"
                placeholder={label}
                value={value}
                onChange={e => changeValue(e.target.value)} />
        </div>
    )
}