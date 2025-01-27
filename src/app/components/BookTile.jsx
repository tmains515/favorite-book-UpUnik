

const BookTile = ({ book, setEdit }) => {

    return (
        <div className="w-full shadow-lg mt-4 ">
            <table className="table-fixed w-full border-collapse border ">

                <tbody>
                    <tr>
                        <td className="px-4 py-2 border break-words max-w-1/4 text-center">
                            {book.title}
                        </td>
                        <td className="px-4 py-2 border break-words max-w-1/4 text-center">
                            {book.author}
                        </td>
                        <td className="px-4 py-2 border break-words max-w-1/4 text-center">
                            {book.genre}
                        </td>
                        <td className="px-4 py-2 border break-words max-w-1/4 text-center">
                            <button className="bg-blue-400 rounded-md" onClick={() => setEdit(book)}>
                                <img src='/pencil.png' alt="" className='w-8 h-8'/>
                            </button>
                            <button className="bg-red-400 m-2 rounded-md">
                                <img src='/trash.png' alt=""  className='w-8 h-8'/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
export default BookTile