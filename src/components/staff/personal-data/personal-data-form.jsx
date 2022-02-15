import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';

import EmployeesSelect from '../../commons/employees-select';
import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const PersonalDataForm = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.PERSONAL_DATA, id, setItems, setIsLoaded);
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
    firstName: '',
    secondName: '',
    lastName: '',
    pesel: '',
    parentsNames: {
      fatherName: '',
      motherName: '',
    },
    dateOfBirth: '',
    education: '',
    address: {
      street: '',
      house: '',
      apartment: '',
      zipCode: '',
      city: '',
    },
    phoneNumber: '',
    email: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'dane osobowe') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.employeeId) {
              errors.employeeId = 'Nie wybrano pracownika!';
            }
            if (!values.firstName) {
              errors.firstName = 'Imię jest wymagane!';
            } else if (values.firstName.length < 2) {
              errors.firstName = 'Imię jest za krótkie!';
            } else if (values.firstName.length > 32) {
              errors.firstName = 'Imię jest za długie!';
            }
            if (values.secondName.length < 2) {
              errors.secondName = 'Drugie imię jest za krótkie!';
            } else if (values.secondName.length > 32) {
              errors.secondName = 'Drugie imię za długie!';
            }
            if (!values.lastName) {
              errors.lastName = 'Nazwisko jest wymagane!';
            } else if (values.lastName.length < 2) {
              errors.lastName = 'Nazwisko jest za krótkie!';
            } else if (values.lastName.length > 32) {
              errors.lastName = 'Nazwisko jest za długie!';
            }
            if (!values.pesel) {
              errors.pesel = 'Numer PESEL jest wymagany!';
            } else if (!/^\d{11}$/i.test(values.pesel)) {
              errors.pesel = 'Wprowadzony numer PESEL jest nieprawidłowy!';
            }
            if (values.parentsNames.fatherName < 2) {
              errors.fatherName = 'Imię ojca jest za krótkie!';
            } else if (values.parentsNames.fatherName.length > 32) {
              errors.fatherName = 'Imię ojca jest za długie!';
            }
            if (values.parentsNames.motherName.length < 2) {
              errors.motherName = 'Imię matki jest za krótkie!';
            } else if (values.parentsNames.motherName.length > 32) {
              errors.motherName = 'Imię matki jest za długie!';
            }
            if (!values.dateOfBirth) {
              errors.dateOfBirth = 'Data urodzenia jest wymagana!';
            } else if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.dateOfBirth)) {
              errors.dateOfBirth = 'Podana data jest nieprawidłowa!';
            }
            if (!values.education) {
              errors.education = 'Musisz wybrać wykształcenie!';
            }
            if (!values.address.street) {
              errors.street = 'Ulica jest wymagana!';
            } else if (values.address.street.length < 2) {
              errors.street = 'Nazwa ulicy jest za krótka!';
            } else if (values.address.street.length > 32) {
              errors.street = 'Nazwa ulicy jest za długa!';
            }
            if (!values.address.house) {
              errors.house = 'Numer domu jest wymagany!';
            }
            if (!/([0-9]{2}-[0-9]{3})/i.test(values.address.zipCode)) {
              errors.zipCode = 'Kod pocztowy jest nieprawidłowy!';
            }
            if (!values.address.city) {
              errors.city = 'Nazwa miasta jest wymagana!';
            }
            if (!/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/i.test(values.phoneNumber)) {
              errors.phoneNumber = 'Wprowadzony nr telefonu jest nieprawidłowy!';
            }
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Wprowadzony adres email jest nieprawidłowy!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetMessages();
  
            if (!id) {
              ApiQueries.addItem(Config.PERSONAL_DATA, values, setMessage, setErrMessage);
            } else {
              ApiQueries.updateItem(Config.PERSONAL_DATA, id, values, setMessage, setErrMessage);
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
                <EmployeesSelect handleChange={handleChange} values={values} />
                {<p className="validationError">{errors.employeeId && touched.employeeId && errors.employeeId}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imię:</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Pierwsze imię"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                {<p className="validationError">{errors.firstName && touched.firstName && errors.firstName}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Drugie imię:</Form.Label>
                <Form.Control
                  type="text"
                  name="secondName"
                  placeholder="Drugie imię"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.secondName}
                />
                {<p className="validationError">{errors.secondName && touched.secondName && errors.secondName}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nazwisko:</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Nazwisko pracownika"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                {<p className="validationError">{errors.lastName && touched.lastName && errors.lastName}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>PESEL:</Form.Label>
                <Form.Control
                  type="text"
                  name="pesel"
                  placeholder="Wpisz numer PESEL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pesel}
                  disabled={id && true}
                />
                {<p className="validationError">{errors.pesel && touched.pesel && errors.pesel}</p>}
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Imię ojca:</Form.Label>
                    <Form.Control
                      type="text"
                      name="parentsNames.fatherName"
                      placeholder="Imię ojca"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.parentsNames.fatherName}
                    />
                    {<p className="validationError">{errors.fatherName && touched.parentsNames?.fatherName && errors.fatherName}</p>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Imię matki:</Form.Label>
                    <Form.Control
                      type="text"
                      name="parentsNames.motherName"
                      placeholder="Imię matki"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.parentsNames.motherName}
                    />
                    {<p className="validationError">{errors.motherName && touched.parentsNames?.motherName && errors.motherName}</p>}
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Data urodzenia:</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateOfBirth ? DateConverters.formDateConverter(values.dateOfBirth) : values.dateOfBirth}
                />
                {<p className="validationError">{errors.dateOfBirth && touched.dateOfBirth && errors.dateOfBirth}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wykształcenie:</Form.Label>
                <Form.Select 
                  name="education"
                  onChange={handleChange}
                  value={values.education}
                  defaultChecked={values?.education}
                >
                  <option value="">Proszę wybrać opcję</option>
                  <option value="1">Podstawowe</option>
                  <option value="2">Gimnazjalne</option>
                  <option value="3">Zasadniczo-zawodowe</option>
                  <option value="4">Zasadniczo-branżowe</option>
                  <option value="5">Średnie</option>
                  <option value="6">Średnie-branżowe</option>
                  <option value="7">Wyższe</option>
                </Form.Select>
                {<p className="validationError">{errors.education && touched.education && errors.education}</p>}
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Ulica:</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.street"
                      placeholder="Nazwa ulicy"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address.street}
                    />
                    {<p className="validationError">{errors.street && touched.address?.street && errors.street}</p>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Nr domu:</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.house"
                      placeholder="Nr domu"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address.house}
                    />
                    {<p className="validationError">{errors.house && touched.address?.house && errors.house}</p>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Nr mieszkania:</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.apartment"
                      placeholder="Nr mieszkania"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address.apartment}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Kod pocztowy:</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.zipCode"
                      placeholder="00-000"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address.zipCode}
                    />
                    {<p className="validationError">{errors.zipCode && touched.address?.zipCode && errors.zipCode}</p>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Miasto:</Form.Label>
                    <Form.Control
                      type="text"
                      name="address.city"
                      placeholder="Miasto"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address.city}
                    />
                    {<p className="validationError">{errors.city && touched.address?.city && errors.city}</p>}
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Numer telefonu:</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  placeholder="Nr telefonu"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                />
                {<p className="validationError">{errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Podaj adres email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {<p className="validationError">{errors.email && touched.email && errors.email}</p>}
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

export default PersonalDataForm;