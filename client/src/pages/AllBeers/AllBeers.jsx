import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import StaffCardBeer from "../../components/StaffCards/StaffCardBeer";

const AllBeers = () => {
  const allBeers = useSelector(state => state.beers)
  const allBrewers = useSelector(state => state.brews)
  const allBeersSorts = allBeers.map(beer => beer.sort)
  const uniqueBeersSorts = allBeersSorts.filter((val, i, ar) => ar.indexOf(val) === i)

  const myFormRef = useRef()

  const [sortFilter, setSortFilter] = useState([])

  const sortFilterHandler = () => {
    console.log(myFormRef.current.elements);
    const pseudo = [...myFormRef.current.elements]
    pseudo.map(el => {
      if (el.checked && !sortFilter.includes(el.value)) {
        setSortFilter(prev => [...prev, el.value])
      } else if (!el.checked) {
        setSortFilter(prev => prev.filter(element => element !== el.value))
      }
    })
  }

  const [filtredBeers, setFiltredBeers] = useState([])

  useEffect(() => {
    setFiltredBeers(allBeers.map(beer => {
      if (sortFilter.includes(beer.sort)) {
        return beer
      }
    }))
  }, [sortFilter])



  console.log(filtredBeers);

  return (
    <div style={{ backgroundImage: 'url(images/background1.jpg)', height: '100vh' }} className="pt-4">
      <div className="container">
        <div id="mobile-filter" className="row">
          <div className='col-2'>
            <div className="py-2 card rounded-3 shadow-sm">
              <div className="card-body">
                <h5 className="font-weight-bold">Сорт пива</h5>
                <div class="form-check">
                  <form ref={myFormRef} onChange={sortFilterHandler}>
                    {
                      uniqueBeersSorts?.map(sort => {
                        return (
                          <>
                            <div className="mt-3">
                              <input class="form-check-input" type="checkbox" name={sort} value={sort} />
                              <label class="form-check-label" for="flexCheckDefault">{sort}</label>
                              <br />
                            </div>
                          </>
                        )
                      })
                    }
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='col-10'>
            <div className="row mb-3">
              {
                !sortFilter.length ?
                  allBeers?.length ? allBeers.map(beer => <StaffCardBeer key={beer._id} beer={beer} />) : 'пиваса нет'
                  :
                  filtredBeers?.length ? filtredBeers.map(beer => beer ? <StaffCardBeer key={beer._id} beer={beer} /> : null) : 'пиваса нет'

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBeers;
