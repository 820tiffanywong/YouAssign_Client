


const colors = [
    "bg-red-400","bg-red-500","bg-red-600",
    "bg-blue-400","bg-blue-500","bg-blue-600",
    "bg-red-700","bg-red-800","bg-red-900",
    "bg-purple-400","bg-purple-500","bg-purple-600",
    "bg-green-400","bg-green-500","bg-green-600",
    "bg-yellow-400","bg-yellow-500","bg-yellow-600",
]

const ColorSelector = ({ setColor }) => {
    return (
        <div className="flex flex-wrap">
            {
                colors.map(color => {
                    return (
                        <div    
                            key={color}
                            className={"scale-75 hover:scale-110 w-6 h-6 transition-all " + color}
                            onClick={() => {
                                setColor(color)
                            }}
                        >
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ColorSelector;