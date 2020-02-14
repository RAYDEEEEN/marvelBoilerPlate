import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './style.css'
import ReactPaginate from 'react-paginate'

const CharactersScreen = () => {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(0)
  useEffect(() => {
    get(0)
  }, [])

  const get = async offset => {
    try {
      console.log('CHECK', offset)
      const { data } = await Axios.get(
        `https://gateway.marvel.com:443/v1/public/characters?apikey=e74466c078cf03a51e11abdec65b254f&hash=6593b515c15ff8d46f53d37ef149c20c&ts=1581697076&offset=${offset}`
      )
      setCharacters(data.data.results)
      setPage(Math.ceil(data.data.total / 20))
      console.log('res', data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePageClick = data => {
    console.log('data', data)
    let selected = data.selected
    let offset = Math.ceil(selected * 20)
    console.log('TCL: CharactersScreen -> offset', offset)
    get(offset)
  }

  return (
    <div>
      {characters.length > 0 ? (
        <ul>
          {characters.map(perso => (
            <li key={perso.id}>{perso.name}</li>
          ))}
        </ul>
      ) : (
        <></>
      )}
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={page}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  )
}

export default CharactersScreen
