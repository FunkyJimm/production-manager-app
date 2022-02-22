import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import EmployeesSelect from '../../commons/employees-select';
import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

import Config from '../../../config/config';

const HolidaysForm = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.HOLIDAYS, id, setItems, setIsLoaded);
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
    totalVacationsDays: '',
    takenVacationsDays: '',
    takenDuvetDays: '',
    daysOfSickness: '',
    daysOfAbsenceFromWork: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'urlopy') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors= {};
            if (!values.employeeId) {
              errors.employeeId = 'Nie wybrano pracownika!';
            }
            if (values.totalVacationsDays < 0) {
              errors.totalVacationsDays = 'Podaj wszystkie dni urlopu!';
            }
            if (values.takenVacationsDays < 0) {
              errors.takenVacationsDays = 'Podaj wykorzystane dni urlopu!';
            }
            if (values.takenDuvetDays < 0) {
              errors.takenDuvetDays = 'Podaj wykorzystane dni urlopu na żądanie!';
            }
            if (values.daysOfSickness < 0) {
              errors.daysOfSickness = 'Podaj dni absencji chorobowej!';
            }
            if (values.daysOfAbsenceFromWork < 0) {
              errors.daysOfAbsenceFromWork = 'Podaj dni nieobecności nieusprawiedliwionych!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetMessages();
  
            if (!id) {
              ApiQueries.addItem(Config.HOLIDAYS, values, setMessage, setErrMessage);
            } else {
              ApiQueries.updateItem(Config.HOLIDAYS, id, values, setMessage, setErrMessage);
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
                <Form.Label>Wszystkie dni urlopu:</Form.Label>
                <Form.Control
                  type="number"
                  name="totalVacationsDays"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.totalVacationsDays || 0}
                  min={0}
                  max={365}
                />
                {<p className="validationError">{errors.totalVacationsDays && touched.totalVacationsDays && errors.totalVacationsDays}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wybrane dni urlopu:</Form.Label>
                <Form.Control
                  type="number"
                  name="takenVacationsDays"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.takenVacationsDays || 0}
                  min={0}
                  max={values.totalVacationsDays}
                />
                {<p className="validationError">{errors.takenVacationsDays && touched.takenVacationsDays && errors.takenVacationsDays}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wykorzystane dni urlopu na żądanie:</Form.Label>
                <Form.Control
                  type="number"
                  name="takenDuvetDays"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.takenDuvetDays || 0}
                  min={0}
                  max={4}
                />
                {<p className="validationError">{errors.takenDuvetDays && touched.takenDuvetDays && errors.takenDuvetDays}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wszystkie dni absencji chorobowej:</Form.Label>
                <Form.Control
                  type="number"
                  name="daysOfSickness"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.daysOfSickness || 0}
                  min={0}
                  max={365}
                />
                {<p className="validationError">{errors.daysOfSickness && touched.daysOfSickness && errors.daysOfSickness}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wszystkie dni obecności nieusprawiedliwionych:</Form.Label>
                <Form.Control
                  type="number"
                  name="daysOfAbsenceFromWork"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.daysOfAbsenceFromWork || 0}
                  min={0}
                  max={365}
                />
                {<p className="validationError">{errors.daysOfAbsenceFromWork && touched.daysOfAbsenceFromWork && errors.daysOfAbsenceFromWork}</p>}
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

export default HolidaysForm;