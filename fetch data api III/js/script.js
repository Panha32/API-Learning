// endpoint = 'https://mile.chandalen.dev/api/students';
endpoint = 'https://fakestoreapi.com/products';

const displayImage = document.getElementById('avatarImage');

displayImage.style.display = 'none';

function getAllData() {
  fetch(endpoint)
  .then(res => res.json())
  .then(json => {
    console.log(json); 
    if (Array.isArray(json)) {
      let card = '';
      json.forEach(element => {
        card += `
          <div class="col-3">
            <div class="card h-100">
              <div class="image">
                  <span class="d-none image-test">${element.image}</span>
                 <img src="${element.image}" class="card-img-top" alt="profile">
              </div>
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <span class="d-none id">${element.id}</span>
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">${element.description}</p>
                </div>
                <div class="wrapper-button gap-2 d-flex justify-content-end">
                  <button class="btn btn-outline-primary"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onclick="getData(this)">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button class="btn btn-outline-danger"
                    onclick="deleteItem(this)">
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      document.querySelector('.row').innerHTML = card;
    }
  })
  .catch(error => console.error('Error:', error));
}

getAllData()

function getData(card) {
  displayImage.style.display = 'block';

  let name = card.parentElement.parentElement.parentElement.querySelector('.card-title').innerHTML;
  let shift = card.parentElement.parentElement.parentElement.querySelector('.card-text').innerHTML;
  let image = card.parentElement.parentElement.parentElement.querySelector('.image-test').innerHTML;
  
  document.getElementById('name').value = name;
  document.getElementById('shift').value = shift;
  document.getElementById('image').src = image;
}

function deleteItem(card) {
  let del = card.parentElement.parentElement.querySelector('.id').innerHTML;
  fetch(endpoint + '/' + del,{
    method:"DELETE"
  })
  .then(res=>res.json())
  .then(json=>{
    card.closest('.col-3').remove();
  })
}
