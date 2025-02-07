import { Logo } from "./icons/icons"

export default function NavBar() {

    return (
        <nav className="sticky flex overflow-hidden justify-between items-center border w-full py-8">
            <div className="flex-1 flex justify-start mx-8 sm:mx-16">
                <Logo />
            </div>
            {/* <button className="mx-8 mt-4 sm:mx-16">
                <SettingsIcon />
            </button> */}
        </nav>
    )
}