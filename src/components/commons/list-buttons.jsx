import { Button } from "react-bootstrap";

import ApiQueries from '../../helpers/api-queries';

const ListButtons = ({ endpoint, id, navigate, setIsLoaded, setMessage }) => {
  const handleDetails = () => {
    navigate(`/${endpoint}/${id}`, { replace: true }, [navigate]);
  }
  
  const handleEdit = () => {
    navigate(`/${endpoint}/form/${id}`, { replace: false }, [navigate]);
  }
  
  const handleDelete = () => {
    ApiQueries.deleteItem(endpoint, id);
    setIsLoaded(false);
    setMessage('Usunięto');
  }

  return (
    <>
      <td>
        <Button 
          onClick={() => handleDetails()} 
          variant="outline-primary"
        >
          Szczegóły
        </Button>
      </td>
      <td>
        <Button 
          onClick={() => handleEdit()} 
          variant="outline-secondary"
        >
          Edycja
        </Button>
      </td>
      <td>
        <Button 
          onClick={() => handleDelete()}
          variant="outline-danger"
        >
          Usuń
        </Button>
      </td>
    </>
  )
}

export default ListButtons;