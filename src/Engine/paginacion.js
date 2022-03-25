
  
// Paginacion recibe las props desde el container de canciones
export default function Paginacion(props) {

    const getPaginas = () => {
      //Calculo de las paginas
      const resultado = [];
      for (let i = 0; i < props.total; i++) {
        let pagina = i + 1;
        resultado.push(
          <li key={1000+pagina} classNameName={props.pagina === pagina ? 'page-item active' : 'page-item'} aria-current="page">
            <span onClick={() => props.onChange(pagina)} classNameName="page-link" >{pagina}</span>
          </li>
        );
      }
      return resultado;
    }
  
  
    return (
      //Retorna una barra nav que se renderiza en la parte inferior del contenedor de canciones
      //permite navegar a traves del paginado
    <nav aria-label="Page navigation">
        <ul classNameName="pagination justify-content-center">
  
            {getPaginas()}
  
            <li classNameName="page-item-total">de {props.total}</li>
            
        </ul>
    </nav>
    );
  }