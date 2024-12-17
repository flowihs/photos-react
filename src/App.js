import React from 'react';
import './index.scss';
import { Collection } from './Collection.jsx'

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [collections, setCollections] = React.useState([])
  const [searchValue, setSearchValue ] = React.useState('')
  const [categoryId, setCategoryId] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    setIsLoading(true)

    const category = categoryId ? `category=${categoryId}` : ''
    

    fetch(`https://6761b89846efb3732372be4e.mockapi.io/photo-resurce?page=${page}&limit=3&${category}` )
      .then(res => res.json())
      .then(json => setCollections(json))
      .catch(err => {
        console.warn(err )
        alert('Ошибка при получении данных')
      }).finally(() => {
        setIsLoading(false)
      })
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, index) => {
              return <li onClick={() => {
                setCategoryId(index)
              }} 
              
              className={categoryId === index ? 'active' : ''} key={obj.name}>{obj.name}</li>
            })
          }
        </ul>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
          {
            isLoading ? (<h2> Идет Загрузка... </h2>) : collections.filter(obj => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase())
            }).map((obj, index) => (
              <Collection 
                key={index}
                name={obj.name}
                images={obj.photos}
              />
            ))
          }



      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_, i) => (
            <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
