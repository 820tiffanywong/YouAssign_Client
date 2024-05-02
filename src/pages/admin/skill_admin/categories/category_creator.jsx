import { useState } from "react"
import { useMutation } from "@apollo/client"
import ColorSelector from "../../../../components/color_selector"
import { CREATE_CATEGORY } from "../../../../access/mutations/create_category"

export const CategoryCreator = () => {
    const [title, setTitle] = useState("") 
    const [color, setColor] = useState("bg-blue-500") 
    const [colorSelector,setColorSelector] = useState(false)
    
    const [createCategory,{ data:updateData, loading:updateLoading, error:updateError} ]= useMutation(CREATE_CATEGORY)

    const onCreate = async () =>{
        const result = await createCategory(
            {
                variables:{
                    input: {
                        title: title_input,
                        color: color_select,
                    }
                },
                refetchQueries:[GET_CATEGORY]
            }
        )
    }

    return (
        <div className='w-full m-0'>
            <div>
                <div className='p-2 w-1/2'>
                    <p className='uppercase dark:text-gray-400'>Category Title</p>
                    <textarea 
                        className='dark:bg-gray-600 dark:text-gray-300 rounded px-2 font-bold w-full resize-none border-0'
                        placeholder='category title'
                        rows="1"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />

                    <div className="flex pt-2">
                        <p className='uppercase dark:text-gray-400 mr-2'>color</p>
                        <div className={"h-6 w-6 " + (color)}>

                        </div>
                        <p 
                            className='cursor-pointer dark:text-blue-400 ml-2'
                            onClick={() => {
                                colorSelector ? setColorSelector(false) : setColorSelector(true)
                            }}
                        >{colorSelector ? "(confirm)" : "(select new)"}</p>
                    </div>
                    <div className="px-3 w-1/2">
                        {
                            colorSelector ? 
                            (
                                <ColorSelector setColor={setColor}/>
                            )
                            :
                            (
                                <></>
                            )
                        }
                    </div>
                </div>

            </div>
            <button 
                className='my-4 p-2 block mx-auto bg-gray-400 rounded-lg'
                onClick={onCreate}  
            >confirm changes</button>
        </div>
    )
}
export default CategoryCreator;