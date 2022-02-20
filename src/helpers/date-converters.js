const dateOnlyConverter = date => {
  const dateOnly = new Date(date);
  return dateOnly.toLocaleDateString();
}

const formDateConverter = date => {
  const formDate = new Date(date);
  const month = formDate.getMonth();
  const day = formDate.getDate();
  return `${formDate.getFullYear()}-${month < 10 
    ? '0'.concat(month + 1) 
    : month + 1}-${day < 10 ? '0'.concat(day) : day}`;
}

export default {
  dateOnlyConverter,
  formDateConverter,
}