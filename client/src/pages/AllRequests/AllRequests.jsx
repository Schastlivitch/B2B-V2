import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import StaffCardRequest from "../../components/StaffCards/StaffCardRequest";

const AllRequests = () => {

  const allRequests = useSelector(state => state.requests)
  const allBars = useSelector(state => state.bars)

  const allRequestsSorts = allRequests?.map(beer => beer.sort)
  const uniqueRequestsSorts = allRequestsSorts?.filter((val, i, ar) => ar.indexOf(val) === i)

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

  const [filtredRequesrs, setFiltredRequesrs] = useState([])

  useEffect(() => {
    setFiltredRequesrs(allRequests?.map(request => {
      if (sortFilter.includes(request.sort)) {
        return request
      }
    }))
  }, [sortFilter])

  return (
    <div style={{ backgroundImage: 'url(images/background1.jpg)', height: '100vh' }} className="pt-4">
      <div className="container">
        <div id="mobile-filter" className="row">
          <div className='col-2'>
            <div className="py-2 card rounded-3 shadow-sm">
              <div className="card-body">
                  <h5 className="font-weight-bold">Сорт</h5>
                <div class="form-check">
                  <form ref={myFormRef} onChange={sortFilterHandler}>
                    {
                      uniqueRequestsSorts?.map(sort => {
                        return (
                          <>
                            <div className="mt-3 ">
                              <input class="form-check-input " type="checkbox" name={sort} value={sort} />
                              <label class="form-check-label ps-2" for="flexCheckDefault">{sort}</label>
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
              {/* {allRequests?.length ? allRequests.map(request => <StaffCardRequest key={request._id} request={request} />) : 'Запросов нет'} */}
              {
                !sortFilter.length ?
                  allRequests?.length ? allRequests.map(request => <StaffCardRequest key={request._id} request={request} />) : 'Запросов нет'
                  :
                  filtredRequesrs?.length ? filtredRequesrs.map(request => request ? <StaffCardRequest key={request._id} request={request} /> : null) : 'Запросов нет'

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllRequests;
