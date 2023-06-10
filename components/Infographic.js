const Infographic = ({Title, Desc, bgColor}) => {
    return (
        <div>
            <div className={`text-3xl border h-70 w-70 bg-${bgColor} m-4 rounded-full p-4`}>
                <p className="font-semibold">
                    {Title}
                </p>
                <p className="text-sm mt-1">
                    {Desc}
                </p>
            </div>
        </div>
    );
}

export default Infographic;