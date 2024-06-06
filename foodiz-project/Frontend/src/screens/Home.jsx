import React from 'react'
import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
  const [burgerImg, setBurgerImg] = useState('');
  const [pastryImg, setPastryImg] = useState('');
  const [barbequeImg, setBarbequeImg] = useState('');
  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const clientId = '1L4rsP73RyJDi0lYehwOc_T_WK8FsMKmu5uwfml1ZLU'; 
  const loadData = async () => {
    let image1 = await fetch(`https://api.unsplash.com/photos/random/?query=burger&client_id=${clientId}&crop=entropy&cs=tinysrgb&h=700`)
    let image2 = await fetch(`https://api.unsplash.com/photos/random/?query=pastry&client_id=${clientId}&crop=entropy&cs=tinysrgb&h=700`)
    let image3 = await fetch(`https://api.unsplash.com/photos/random/?query=biriyani&client_id=${clientId}&crop=entropy&cs=tinysrgb&h=700`)

    const image1data = await image1.json();
    const image2data = await image2.json();
    const image3data = await image3.json();
    setBurgerImg(image1data.urls.regular);
    setBarbequeImg(image3data.urls.regular);
    setPastryImg(image2data.urls.regular);


    let response = await fetch('http://localhost:3000/api/foodData', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    });
    response = await response.json();
    // console.log(response[0],response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }
  useEffect(() => {
    loadData();
  }, []);
  
  return (
    <div>
      <Navigation />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div id='searchBar'>
                <div className="d-flex justify-content-center">
                  <input type="search" className="form-control bg-secondary text-dark search-input" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                  {/* <button type="button" className="btn btn-outline-light text-white" data-mdb-ripple-init>search</button> */}
                </div>
              </div>
              {/* search bar new*/}
              {/* search bar new*/}
            </div>
            <div className="carousel-item active">
              <img src={burgerImg} className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={pastryImg} className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={barbequeImg} className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev" style={{marginLeft: '10%'}}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next" style={{marginRight: '10%'}}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodCat != []
            ? foodCat.map((data) => {
              return (
                <div key={data._id} className="row mb-3">
                  <div className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem != [] ? 
                  foodItem.filter((items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map((filterItems) => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItem = {filterItems}
                            options={filterItems.options[0]}
                            
                          ></Card>
                        </div>
                      )
                    })
                    : <div>No Such File In Directory</div>
                  }
                </div>
              )
            })
            : ""
        }
      </div>
      <div><Footer></Footer></div>
    </div>
  )
}
