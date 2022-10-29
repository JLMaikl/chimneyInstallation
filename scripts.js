
const loadBtn = document.querySelector('.js-load');
const resultsContainer = document.querySelector('.js-results');
const searchInput = document.querySelector('.js-input');

loadBtn.addEventListener('click', function (evt) {
  evt.preventDefault();

  const searchValue = searchInput.value.trim().toLowerCase();
  fetch(`https://api.github.com/users/${searchValue}`)
    .then((successResponse) => {
      if (successResponse.status != 200) {
        return null;
      } else {
        return successResponse.json();
      }
    })
    .then((data) => {
      if (data === null) {
        resultsContainer.innerHTML += `<div class="response-container">                            
                            <p>Репозиторий не найден<p>
                        </div>`;
      } else {
        resultsContainer.innerHTML += `<div class="response-container">
                            <img src="${data.avatar_url}">
                            <p> Имя: <span>${data.login}</span><p>
                            <p> О себе: <span>${data.bio}</span><p>
                            <p> Кол-во репозиториев: <span>${data.public_repos}</span><p>
                        </div>`;
      }
    })
    .catch((err) => console.log(err));



    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => { res.data.map(obj => {
            resultsContainer.innerHTML += `<div class="response-container">                            
                            <p>id: <span>${obj.id}</span><p>
                            <p>Name: <span>${obj.name}</span><p>
                            <p>Username: <span>${obj.username}</span><p>
                            <p>Email: <span>${obj.email}</span><p>
                        </div>`;})
      })
      .catch((error) => {
        console.log(error);
      });
});
