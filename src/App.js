import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
import axios from 'axios'
import Paginacion from "../src/Engine/paginacion";
import { Alert } from 'bootstrap';

function App() {
  
  const [countries, setCountries]=useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [datos, setDatos] = useState({
    consulta: '',
  });

  useEffect(()=>{
    loadData();
  },[])

  const handleInputChange = (event) => {
    // console.log(event.target.name)
    console.log(event.target.value)
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const loadData = () =>{
    let url='https://restcountries.com/v2/all';
      axios.get(url)
      .then(res => {
        setCountries(res.data)
        console.log(res.data[0])

      })
      .catch((error) => {
        console.log(error); 
      });   
  }

  const pageTotal = 8;

  const getTotalPaginas = () => {
    let totalCountries = countries.length;
    return Math.ceil(totalCountries / pageTotal);
  };

  let paginateCountry = countries.slice(
    (paginaActual - 1) * pageTotal,
    paginaActual * pageTotal
  );


  const search=(e)=>{

    var resultadosBusqueda=countries.filter((elemento)=>{
      if(elemento.name.toString().toLowerCase().includes(datos.consulta.toLowerCase())
      ){
        return elemento;
      }
    });
    setCountries(resultadosBusqueda);
    e.preventDefault();
  };

  const searchRegionAfrica=(e)=>{

    alert('entre a buscar por region')

    setDatos({
      ...datos,
      consulta: "Africa",
    });

    var resultadosBusqueda=countries.filter((elemento)=>{
      if(elemento.region.toString().toLowerCase().includes(datos.consulta.toLowerCase())
      ){
        return elemento;
      }
    });
    setCountries(resultadosBusqueda);
    e.preventDefault();
  };

  return (
    
    <div className="App">


        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div class="navbar-brand"><h3>Where in the world ?</h3></div>
          </div>
        </nav>
        
        <nav className="bg light navbar navbar-expand-lg navbar-light bg-light">
        
        <form className="search d-flex" onSubmit={search}>
        
          
          <button class="" type="submit"><i class="fa fa-search"></i></button>
          <input className="form-control me-2" name="consulta" type="search" placeholder="Search for country..." aria-label="Search" onChange={handleInputChange}/>
        
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filter by Region
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <button type="button" class="dropdown-item" onclick={searchRegionAfrica}>Africa</button>
            <li><button class="dropdown-item">America</button></li>
            <li><button class="dropdown-item">Asia</button></li>
            <li><button class="dropdown-item">Europe</button></li>
            <li><button class="dropdown-item">Oceania</button></li>
            
          </ul>
        </li>
      </ul>
    </div>
        </form>

        </nav>

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
                          {paginateCountry.map((country) => (
                            
                            <div className="col-md-4 col-lg-3 col-sm-12 marginl">
<div className="product product-7 text-center">
  <figure className="product-media">
    <div>
      <a href=""
          target="_blank"
      >
        <img
          src={country.flags.png}
          alt="Product"
          className="product-image rounded h300"
        />
      </a>
      <br />
    </div>


    <div className="product-action-vertical">
      <div
        className="btn-product-icon btn-quickview"
        title="Vista Rapida"
      >
        <br />
        <span className="">
          <h4>{country.name}</h4>
        </span>
      </div>
    </div>

    <div className="product-action-vertical">
      <div
        className="btn-product-icon btn-quickview"
        title="Vista Rapida"
      >
        <span className="">
          <strong>Population: </strong>{country.population}
        </span>
        <br />
      </div>
    </div>

    <div className="product-action-vertical">
      <div
        className="btn-product-icon btn-quickview"
        title="Vista Rapida"
      >
       
        <span className="">
          <strong>Region: </strong>{country.region}
        </span>
        <br />
      </div>
    </div>
    <div className="product-action-vertical">
      <div
        className="btn-product-icon btn-quickview"
        title="Vista Rapida"
      >
       
        <span className="">
          <strong>Capital: </strong>{country.capital}
        </span>
        <br />
      </div>
    </div>

  </figure>
</div>


</div>
                            
                 

  ))}
                          <Paginacion
                            pagina={paginaActual}
                            total={getTotalPaginas()}
                            onChange={(pagina) => {
                              setPaginaActual(pagina);
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

export default App;
