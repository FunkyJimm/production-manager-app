const formTitle = (id, title) => {
  if (id) {
    return <h1>Edytuj {title}</h1>
  } else {
    return <h1>Dodaj {title}</h1>
  }
}

export default formTitle;