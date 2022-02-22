import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import EmployeesSelect from '../../commons/employees-select';
import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const TrainingsForm = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.TRAININGS, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const resetMessages = () => {
    setMessage('');
    setErrMessage('');
  }

  let initialValues = {
    employeeId: '',
    title: '',
    description: '',
    dateOfTraining: '',
    expirationDate: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'szkolenie') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.employeeId) {
              errors.employeeId = 'Nie wybrano pracownika!';
            }
            if (!values.title) {
              errors.title = 'Tytuł jest wymagany!';
            } else if (values.title.length < 2) {
              errors.title = 'Tytuł jest za krótki!';
            } else if (values.title.length > 64) {
              errors.title = 'Tytuł jest za długi!';
            }
            if (!values.description) {
              errors.description = 'Opis jest wymagany!';
            } else if (values.description.length < 2) {
              errors.description = 'Opis jest za krótki!';
            } else if (values.description.length > 512) {
              errors.description = 'Opis jest za długi!';
            }
            if (!values.dateOfTraining) {
              errors.dateOfTraining = 'Data zawarcia umowy jest wymagana!';
            } else if (!values.dateOfTraining && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.dateOfTraining)) {
              errors.dateOfTraining = 'Podana data jest nieprawidłowa!';
            }
            if (!values.expirationDate) {
              errors.expirationDate = 'Data zakończenia umowy jest wymagana!';
            } else if (!values.expirationDate && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.expirationDate)) {
              errors.expirationDate = 'Podana data jest nieprawidłowa!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetMessages();
  
            if (!id) {
              ApiQueries.addItem(Config.TRAININGS, values, setMessage, setErrMessage);
            } else {
              ApiQueries.updateItem(Config.TRAININGS, id, values, setMessage, setErrMessage);
            }
  
            if (message) {
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
                <EmployeesSelect handleChange={handleChange} value={values.employeeId} />
                {<p className="validationError">{errors.employeeId && touched.employeeId && errors.employeeId}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tytuł:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Wpisz tytuł szkolenia"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                {<p className="validationError">{errors.title && touched.title && errors.title}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Opis:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Opis szkolenia"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {<p className="validationError">{errors.description && touched.description && errors.description}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data szkolenia:</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfTraining"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateOfTraining ? DateConverters.formDateConverter(values.dateOfTraining) : values.dateOfTraining}
                />
                {<p className="validationError">{errors.dateOfTraining && touched.dateOfTraining && errors.dateOfTraining}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data ważności szkolenia:</Form.Label>
                <Form.Control
                  type="date"
                  name="expirationDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.expirationDate ? DateConverters.formDateConverter(values.expirationDate) : values.expirationDate}
                />
                {<p className="validationError">{errors.expirationDate && touched.expirationDate && errors.expirationDate}</p>}
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

export default TrainingsForm;