
const loadBtnNumber = document.querySelector('.js-load_number');
const resultsContainerNumber = document.querySelector('.js-results_number');
const searchInputNumber = document.querySelector('.js-input_number');

loadBtnNumber.addEventListener('click', function (evt) {
  evt.preventDefault();

  const searchValueNumber = +searchInputNumber.value.trim().toLowerCase();

  try {
    if (isNaN(searchValueNumber) || searchValueNumber === '' ||  searchValueNumber < 5 || searchValueNumber > 10 ) {
      throw new Error('Неправильно! Введите число еще раз');
  } else {
    resultsContainerNumber.innerHTML = 'Вы ввели число: ' + searchValueNumber;
  } 
    }
    catch (err){

      resultsContainerNumber.innerHTML = err.message;
  }
  
});
