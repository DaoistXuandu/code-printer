"use client"

type ChangeValueFunction = (value: string) => void;

export default function LabelInput({ changeValue, label, value, type }: { changeValue: ChangeValueFunction, label: string, value: string, type: string }) {
    return (
        <div className="flex flex-col">
            <div className="font-bold">
                {label}
            </div>
            <input
                type={type}
                className="text-black text-sm p-2 rounded mt-1"
                placeholder={label}
                value={value}
                onChange={e => changeValue(e.target.value)} />
        </div>
    )
}