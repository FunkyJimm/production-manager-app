import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import EmployeesSelect from '../../commons/employees-select';
import ProductsSelect from '../../commons/products-select';
import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

import Config from '../../../config/config';

const ShiftsForm = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.SHIFTS, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const resetMessages = () => {
    setMessage('');
    setErrMessage('');
  }

  let initialValues = {
    shift: '',
    managerId: '',
    mechanicId: '',
    productId: '',
    quantityProduced: '',
    waste: '',
    workingTime: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'raport zmianowy') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.shift) {
              errors.staff = 'Podaj zmianę!';
            }
            if (!values.managerId) {
              errors.managerId = 'Nie wybrano brygadzisty!';
            }
            if (!values.mechanicId) {
              errors.mechanicId = 'Nie wybrano mechanika!';
            }
            if (!values.productId) {
              errors.productId = 'Nie wybrano produktu!';
            }
            if (!values.quantityProduced) {
              errors.quantityProduced = 'Podaj wyprodukowaną ilość!';
            }
            if (values.waste < 0) {
              errors.waste = 'Straty nie mogą być mniejsze od 0!';
            }
            if (!values.workingTime) {
              errors.workingTime = 'Podaj czas pracy!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetMessages();
  
            if (!id) {
              ApiQueries.addItem(Config.SHIFTS, values, setMessage, setErrMessage);
            } else {
              ApiQueries.updateItem(Config.SHIFTS, id, values, setMessage, setErrMessage);
            }
  
            if (!message) {
              setSubmitting(false);
              resetForm();
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Podaj numer zmiany:</Form.Label>
                <Form.Select 
                  name="shift"
                  onChange={handleChange}
                  value={values.shift}
                  defaultChecked={values?.shift}
                >
                  <option value="">Proszę wybrać opcję</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </Form.Select>
                {<p className="validationError">{errors.shift && touched.shift && errors.shift}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wybierz brygadzistę:</Form.Label>
                <EmployeesSelect handleChange={handleChange} value={values.managerId} name="managerId" />
                {<p className="validationError">{errors.managerId && touched.managerId && errors.managerId}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wybierz mechanika:</Form.Label>
                <EmployeesSelect handleChange={handleChange} value={values.mechanicId} name="mechanicId" />
                {<p className="validationError">{errors.mechanicId && touched.mechanicId && errors.mechanicId}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wybierz produkt:</Form.Label>
                <ProductsSelect handleChange={handleChange} values={values} name="productId" />
                {<p className="validationError">{errors.productId && touched.productId && errors.productId}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wyprodukowana ilość:</Form.Label>
                <Form.Control
                  type="number"
                  name="quantityProduced"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quantityProduced || 0}
                  min={0}
                />
                {<p className="validationError">{errors.quantityProduced && touched.quantityProduced && errors.quantityProduced}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Odpad:</Form.Label>
                <Form.Control
                  type="number"
                  name="waste"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.waste || 0}
                  min={0}
                />
                {<p className="validationError">{errors.waste && touched.waste && errors.waste}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Czas pracy w godzinach:</Form.Label>
                <Form.Control
                  type="number"
                  name="workingTime"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.workingTime || 0}
                  min={0}
                />
                {<p className="validationError">{errors.workingTime && touched.workingTime && errors.workingTime}</p>}
              </Form.Group>
              <Button variant="outline-primary" type="submit" disabled={isSubmitting}>Zatwierdź</Button>
              <ReturnButton />
            </Form>          
          )}
        </Formik>
  
        { message && <Alert variant="success">{message}</Alert> }
        { errMessage && <Alert variant="danger">{errMessage}</Alert> }
      </div>
    )
  } else {
    return (
      <Loading />
    )
  }
}

export default ShiftsForm;