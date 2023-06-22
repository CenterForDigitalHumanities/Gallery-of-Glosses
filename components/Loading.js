import { FadeLoader } from "react-spinners";
import { useEffect } from "react";

const Loading = ({progress}) => {
    const progressPercentage = Math.round(progress * 100);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (progressPercentage === 0) {
                location.reload();
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [progressPercentage]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <FadeLoader color={'#B71C1C'} speedMultiplier={2} />
            <div className="w-full h-4 rounded-full bg-gray-200 mt-6 overflow-hidden">
                <div 
                    style={{width: `${progressPercentage}%`}} 
                    className="h-full bg-black transition-width duration-500 ease-in-out"
                />
            </div>
            <p className="text-lg mt-5">Loading... {progressPercentage}%</p>
        </div>
    )
}

export default Loading;
