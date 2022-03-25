import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Paginacion from "../src/Engine/paginacion";


export default function App() {
  const [countries, setCountries] = useState([]);
  const [countries2, setCountries2] = useState([]);
  const [actualPage, setactualPage] = useState(1);
  const [data, setData] = useState({
    consulta: "",
  });

  const [data1, setData1] = useState({
    consulta1: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const handleInputChange = (event) => {
    // console.log(event.target.name)
    console.log(event.target.value);
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });

    if(data.consulta===""){
      setCountries(countries2);
    }else{
      var resultadosBusqueda = countries.filter((elemento) => {
        if (
          elemento.name
            .toString()
            .toLowerCase()
            .includes(data.consulta.toLowerCase())
        ) {
          
          return elemento;
        }
      });
      setCountries(resultadosBusqueda);
     
  

    }

    
  };

  const handleInputChange1 = (event) => {
   
    // console.log(event.target.name)
    console.log(event.target.value);
    console.log(event.target.name)


    
    setData1({
      ...data1,
      [event.target.name]: event.target.value,
    });

    var resultadosBusqueda = countries.filter((elemento) => {
      if (
        elemento.region
          .toString()
          .toLowerCase()
          .includes(data1.consulta1.toLowerCase())
      ) {
        return elemento;
      }
    });
    setCountries(resultadosBusqueda);
    event.preventDefault();

    



  };



  const loadData = () => {
    let url = "https://restcountries.com/v2/all";
    axios
      .get(url)
      .then((res) => {
        setCountries(res.data);
        setCountries2(res.data)
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pageTotal = 8;

  const getTotalPaginas = () => {
    let totalCountries = countries.length;
    return Math.ceil(totalCountries / pageTotal);
  };

  let paginateCountry = countries.slice(
    (actualPage - 1) * pageTotal,
    actualPage * pageTotal
  );

  const search = (e) => {
    var resultadosBusqueda = countries.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(data.consulta.toLowerCase())
      ) {
        return elemento;
      }
    });
    setCountries(resultadosBusqueda);
    e.preventDefault();
  };

  return (
    <div classNameName="App">
      <nav classNameName="navbar navbar-expand-lg navbar-light bg-light">
        <div classNameName="container-fluid">
          <div classNameName="navbar-brand">
            <h3>Where in the world ?</h3>
          </div>
        </div>
      </nav>

      <nav classNameName="bg light navbar navbar-expand-lg navbar-light bg-light"></nav>

      <div classNameName="" id="searchBar">
        <div classNameName="" id="searchCountry">
          {/* begin searchBar */}
          <form classNameName="search d-flex" onSubmit={search}>
            {/* <button classNameName="" type="submit">
              <i classNameName="fa fa-search"></i>
            </button> */}
              <i className="material-icons">search</i>
            <input
              classNameName="form-control me-2"
              name="consulta"
              type="search"
              placeholder="Search for country..."
              aria-label="Search"
              onChange={handleInputChange}
            />
          </form>
        </div>
        <div classNameName="" id="filterRegion">
        <div classNameName="col-md-5">
                                        
                                        <select name="consulta1" onChange={handleInputChange1} classNameName="form-select" id="categoria" required>
                                            <option value="">Find by Region...</option>
                                            <option>Africa</option>
                                            <option>America</option>
                                            <option>Asia</option>
                                            <option>Europe</option>
                                            <option>Oceania</option>
                                        </select>
                                    </div>          
        </div>
      </div>

      <div>
        <main classNameName="main">
          <br />

          <div classNameName="page-content">
            <div
              classNameName="
                
                "
            >
              <div classNameName="row">
                <div classNameName="col12 col-lg-12">
                  <div classNameName="products mb-3">
                    <div classNameName="row justify-content-center">
                      {/* mapeo de las canciones en el contenedor  */}
                      {paginateCountry.map((country) => (
                        <div classNameName="col-md-4 col-lg-3 col-sm-12 marginl">
                          <div classNameName="product product-7 text-center">
                            <figure classNameName="product-media">
                              <div>
                                <a href="" target="_blank">
                                  <img
                                    src={country.flag}
                                    alt="Product"
                                    classNameName="product-image rounded h300"
                                  />
                                </a>
                                <br />
                              </div>

                              <div classNameName="product-action-vertical">
                                <div
                                  classNameName="btn-product-icon btn-quickview"
                                  title="Vista Rapida"
                                >
                                  <br />
                                  <span classNameName="">
                                    <h4>{country.name}</h4>
                                  </span>
                                </div>
                              </div>

                              <div classNameName="product-action-vertical">
                                <div
                                  classNameName="btn-product-icon btn-quickview"
                                  title="Vista Rapida"
                                >
                                  <span classNameName="">
                                    <strong>Population: </strong>
                                    {country.population}
                                  </span>
                                  <br />
                                </div>
                              </div>

                              <div classNameName="product-action-vertical">
                                <div
                                  classNameName="btn-product-icon btn-quickview"
                                  title="Vista Rapida"
                                >
                                  <span classNameName="">
                                    <strong>Region: </strong>
                                    {country.region}
                                  </span>
                                  <br />
                                </div>
                              </div>
                              <div classNameName="product-action-vertical">
                                <div
                                  classNameName="btn-product-icon btn-quickview"
                                  title="Vista Rapida"
                                >
                                  <span classNameName="">
                                    <strong>Capital: </strong>
                                    {country.capital}
                                  </span>
                                  <br />
                                </div>
                              </div>
                            </figure>
                          </div>
                        </div>
                      ))}
                      <Paginacion
                        pagina={actualPage}
                        total={getTotalPaginas()}
                        onChange={(pagina) => {
                          setactualPage(pagina);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}