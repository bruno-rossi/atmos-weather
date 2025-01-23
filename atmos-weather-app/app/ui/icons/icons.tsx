import Image from "next/image";

export function Logo() {

    return (
        <div className="flex items-center gap-4">
            <Image 
                src="/Partly-cloudy.svg"
                width={80}
                height={80}
                alt="Atmos Weather logo"
            />
            <h1 className="text-2xl font-bold max-w-[90px]">Atmos Weather</h1>
        </div>
    )
}

export function SettingsIcon() {

    return (
        <Image 
            src="/cog-settings.svg"
            width={40}
            height={40}
            alt="Settings icon"
        />
    )
}