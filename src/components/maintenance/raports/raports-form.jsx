import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import MachinesSelect from '../../commons/machines-select';
import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const RaportsForm = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.RAPORTS, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const resetMessages = () => {
    setMessage('');
    setErrMessage('');
  }

  let initialValues = {
    machineId: '',
    name: '',
    description: '',
    breakdownDate: '',
    timeOfBreakdown: '',
    isFixed: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'raport') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.machineId) {
              errors.mechanicId = 'Nie wybrano maszyny!';
            }
            if (!values.name) {
              errors.name = 'Nazwa jest wymagana!';
            } else if (values.name.length < 2) {
              errors.name = 'Nazwa jest za krótka!';
            } else if (values.name.length > 32) {
              errors.name = 'Nazwa jest za długa!';
            }
            if (!values.description) {
              errors.description = 'Opis jest wymagany!';
            } else if (values.description.length < 2) {
              errors.description = 'Opis jest za krótki!';
            } else if (values.description.length > 64) {
              errors.description = 'Opis jest za długi!';
            }
            if (!values.breakdownDate) {
              errors.breakdownDate = 'Data awarii jest wymagana!';
            } else if (!values.breakdownDate && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.breakdownDate)) {
              errors.breakdownDate = 'Podana data jest nieprawidłowa!';
            }
            if (!values.timeOfBreakdown) {
              errors.timeOfBreakdown = 'Podaj czas awarii!';
            }
            if (!values.isFixed) {
              errors.isFixed = 'Wybierz aktualny stan naprawy!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetMessages();
  
            if (!id) {
              ApiQueries.addItem(Config.RAPORTS, values, setMessage, setErrMessage);
            } else {
              ApiQueries.updateItem(Config.RAPORTS, id, values, setMessage, setErrMessage);
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
                <Form.Label>Wybierz maszynę:</Form.Label>
                <MachinesSelect handleChange={handleChange} values={values} />
                {<p className="validationError">{errors.machineId && touched.machineId && errors.machineId}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nazwa:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Nazwa maszyny"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {<p className="validationError">{errors.name && touched.name && errors.name}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Opis:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Nazwa maszyny"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {<p className="validationError">{errors.description && touched.description && errors.description}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data awarii:</Form.Label>
                <Form.Control
                  type="date"
                  name="breakdownDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.breakdownDate ? DateConverters.formDateConverter(values.breakdownDate) : values.breakdownDate}
                />
                {<p className="validationError">{errors.breakdownDate && touched.breakdownDate && errors.breakdownDate}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Czas awarii:</Form.Label>
                <Form.Control
                  type="number"
                  name="timeOfBreakdown"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.timeOfBreakdown || 0}
                  min={0}
                />
                {<p className="validationError">{errors.timeOfBreakdown && touched.timeOfBreakdown && errors.timeOfBreakdown}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stan maszyny po naprawie:</Form.Label>
                <Form.Select 
                  name="isFixed"
                  onChange={handleChange}
                  value={values.isFixed}
                  defaultChecked={values?.isFixed}
                >
                  <option value="">Proszę wybrać opcję</option>
                  <option value="true">Naprawiona</option>
                  <option value="false">Nie sprawna</option>
                </Form.Select>
                {<p className="validationError">{errors.isFixed && touched.isFixed && errors.isFixed}</p>}
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

export default RaportsForm;