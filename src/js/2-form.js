const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: '',
};

//  Завантаження даних зі сховища + заповнення форми
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  const parsedData = JSON.parse(savedData);

  formData.email = parsedData.email || '';
  formData.message = parsedData.message || '';

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

//  input listener (делегування)
form.addEventListener('input', handleInput);

function handleInput(event) {
  const { name, value } = event.target;

  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

//  submit listener
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  //  перевірка
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  //  якщо все ок
  console.log(formData);

  //  очищення
  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  form.reset();
}
