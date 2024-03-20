export const Balance = ({ value }) => {
    return <div className="flex mt-5 p-4">
        <div className="pl-2 font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            ₹ {value}
        </div>
    </div>
}