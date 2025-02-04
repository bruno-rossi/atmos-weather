// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
  import { WeatherIcon } from "./icons/icons";

  export function CardsWrapperSkeleton() {
    return (
        <div className="flex flex-col gap-4 bg-freshAir w-[80%] h-[100%] py-8 px-8 rounded-xl mx-auto">
            <LocationCardSkeleton />
            <LocationCardSkeleton />
        </div>
    )
  }

  export function LocationCardSkeleton() {

    return (
        <div className={`${shimmer} group flex flex-col bg-white w-full mx-auto py-4 px-4 border rounded-xl bg-gray-100`}>
            <div className="flex flex-row justify-end ">
                <div className="block py-2 h-6">
                </div>
            </div>
            <div className="grid grid-cols-6 gap-6 w-full items-center">
                <div className="col-span-1 text-center">
                <WeatherConditionSkeleton/>
                </div>
                <h2 className="mx-auto col-span-2 text-4xl text-center truncate w-36 rounded-md h-6 bg-gray-200">
                </h2>
                <h3 className="mx-auto col-span-2 text-3xl text-center w-36 rounded-md h-6 bg-gray-200">
                </h3>
                <h3 className="mx-auto col-span-1 text-3xl text-center w-16 rounded-md h-6 bg-gray-200">
                </h3>
            </div>
            <ForecastTableSkeleton />
        </div>
    )
}

export function WeatherConditionSkeleton() {

    return (
        <div className="p-4 mx-auto flex flex-col items-center justify-center">
            <div className="mx-auto h-6 w-16 rounded-md bg-gray-200" />
            <p className="mt-2 text-center w-24 rounded-md h-4 bg-gray-200"></p>
        </div>
    )
}

export function ForecastTableSkeleton() {
    return (
        <table className="mx-auto w-full">
            <thead>
                <tr className="grid grid-cols-6 text-center">
                    <td className="mx-auto w-24 h-4 bg-gray-200 rounded-md my-1"></td>
                    <td className="mx-auto w-24 h-4 bg-gray-200 rounded-md my-1"></td>
                    <td className="mx-auto w-24 h-4 bg-gray-200 rounded-md my-1"></td>
                    <td className="mx-auto w-24 h-4 bg-gray-200 rounded-md my-1"></td>
                    <td className="mx-auto w-24 h-4 bg-gray-200 rounded-md my-1"></td>
                    <td className="mx-auto w-24 h-4 bg-gray-200 rounded-md my-1"></td>
                </tr>
            </thead>
            <tbody>
                <tr className="grid grid-cols-6 text-center">
                    <td className="mx-auto w-24 h-4 bg-gray-200 rounded-md my-1"></td>
                    <td className="mx-auto w-24 h-4 bg-gray-200 rounded-md my-1"></td>
                    <td className="mx-auto w-24 h-4 bg-gray-200 rounded-md my-1"></td>
                    <td className="mx-auto w-24 h-4 bg-gray-200 rounded-md my-1"></td>
                    <td className="mx-auto w-24 h-4 bg-gray-200 rounded-md my-1"></td>
                    <td className="mx-auto w-24 h-4 bg-gray-200 rounded-md my-1"></td>
                </tr>
                <tr className="grid grid-cols-6">
                    <td><WeatherConditionSkeleton/></td>
                    <td><WeatherConditionSkeleton/></td>
                    <td><WeatherConditionSkeleton/></td>
                    <td><WeatherConditionSkeleton/></td>
                    <td><WeatherConditionSkeleton/></td>
                    <td><WeatherConditionSkeleton/></td>
                </tr>
            </tbody>
        </table>
    )
}