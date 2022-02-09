const errorsHandler = (status) => {
  let message = '';
  
  switch (status) {
    case 400:
      message = 'Nieprawidłowe zapytanie.'
      break;
    case 403:
      message = 'Wprowadzone dane są nieprawidłowe.'
      break;
    case 404:
      message = 'Nie odnaleziono żadnych zasobów. Prawdopodobnie lista jest pusta.'
      break;
    case 500:
      message = 'Błąd serwera. Spróbuj ponownie lub skontaktuj się z administratorem.'
      break;
    default:
      message = 'Coś poszło nie tak. Skontaktuj się z administratorem.'
      break;
  }

  return message;
}

export default errorsHandler;