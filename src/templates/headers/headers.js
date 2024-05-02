import '../../index.css'

export const SubHeader_v1 = (args) => {
    return (
        <div>
            <p className='text-2xl'>
                {args.main_text}
            </p>
            <p className='text-sm text-gray-400'>
                {args.sub_text}
            </p>
        </div>
    )
}

export const Header_v1 = (args) => {
    return (
        <div>
            <p className='text-4xl'>
                {args.main_text}
            </p>
            <p className='text-lg text-gray-400'>
                {args.sub_text}
            </p>
        </div>
    )
}