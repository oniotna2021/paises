import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Paginacion from "../src/Engine/paginacion";

export default function App() {
  const [countries1, setCountries1] = useState([]);
  const [countries, setCountries] = useState([]);
  // const [actualPage, setactualPage] = useState(1);
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

    const url = "https://restcountries.com/v2/name/" + event.target.value;
    axios
      .get(url)
      .then((res) => {
        setCountries(res.data);

        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  };

  const handleInputChange1 = (event) => {
    // console.log(event.target.name)
    
    if (event.target.value === "") {
      let url = "https://restcountries.com/v2/all";
      axios
        .get(url)
        .then((res) => {
          setCountries(res.data);

          // console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    var resultadosBusqueda = countries.filter((elemento) => {
      if (
        elemento.region
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        return elemento;
      }
    });
    setCountries(resultadosBusqueda);
    console.log(resultadosBusqueda);
    event.preventDefault();

    // axios
    //   .get(url)
    //   .then((res) => {
    //     setCountries(res.data[0]);
    //     console.log(res.data[0].name);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // event.preventDefault();
  };

  const loadData = () => {
    let url = "https://restcountries.com/v2/all";
    axios
      .get(url)
      .then((res) => {
        setCountries(res.data);

        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navtop">
        <div className="container-fluid">
          <div className="navbar-brand" id="wherefont">
            <h3 id="where"><b>Where in the world ?</b></h3>
          </div>
        </div>
      </nav>

      <nav className="bg light navbar navbar-expand-lg navbar-light bg-light"></nav>

      <div className="" id="searchBar">
        <div className="" id="searchCountry">
          {/* begin searchBar */}
          <form className="search d-flex">
            {/* <button className="" type="submit">
              <i className="fa fa-search"></i>
            </button> */}
            <i class="material-icons">search</i>
            <input
              className="form-control me-2"
              name="consulta"
              type="search"
              placeholder="Search for country..."
              aria-label="Search"
              onChange={handleInputChange}
            />
          </form>
        </div>
        <div className="" id="filterRegion">
          <div className="col-md-5" id="filter">
            <select
              name="consulta1"
              onChange={handleInputChange1}
              className="form-select"
              id="categoria"
              required
            >
              <option value="">Filter by Region...</option>
              <option>africa</option>
              <option>america</option>
              <option>asia</option>
              <option>europe</option>
              <option>oceania</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <main className="main">
          <br />

          <div className="page-content">
            <div
              className="
                
                "
            >
              <div className="row">
                <div className="col12 col-lg-12">
                  <div className="products mb-3">
                    <div className="row justify-content-center">
                      {/* mapeo de las canciones en el contenedor  */}
                      {countries.map((country) => (
                        <div className="col-md-4 col-lg-3 col-sm-12 marginl" id="cardContainer">
                        <div className="card rounded">
                          <div id="imgcard" className="Rounded">
                          <img src={country.flags.png} id="just" className="Rounded"/>
                          </div>
                          
                          <div className="textcard">
                          <h5><b>{country.name}</b></h5>
                          <h8 className="smalltext"><strong>Population: </strong></h8>{country.population}
                          <br/>
                          <h8 className="smalltext"><strong>Region: </strong></h8>{country.region}
                          <br/>
                          <h8 className="smalltext"><strong>Capital: </strong></h8>{country.capital}
                          
                          </div>
                          
                       

                        </div>
                        </div>
                      ))}
                      {/* <Paginacion
                        pagina={actualPage}
                        total={getTotalPaginas()}
                        onChange={(pagina) => {
                          setactualPage(pagina);
                        }}
                      /> */}
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
