endpoint = "https://stuinfo.tele-ict.com/api/students";

const displayImage = document.getElementById("avatarImage");
const hiddenId = document.getElementById("hiddenId");

displayImage.style.display = "none";
hiddenId.style.display = "none";

function clearModalFields() {
  document.getElementById("modalTitle").innerHTML = "Add Student";
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("shift").value = "";
  document.getElementById("image").src = "";
  displayImage.style.display = "none";
}

function getAllData() {
  fetch(endpoint)
  .then((res) => res.json())
  .then((json) => {
    console.log(json);

    let card = "";
    json.data.forEach((element) => {
      card += `
            <div class="col-3">
              <div class="card h-100">
                <div class="image">
                  <span class="d-none image-test">${element.avarta}</span>
                  <img src="${element.avarta}" class="card-img-top" alt="profile">
                </div>
                <div class="card-body d-flex flex-column justify-content-between">
                  <div>
                    <span class="d-none id">${element.id}</span>
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.class}</p>
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
    document.querySelector(".row").innerHTML = card;
  })
  .catch((error) => console.error("Error:", error));
}

getAllData();

function add_Update() {
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let shift = document.getElementById("shift").value;
  let formData = new FormData();
  formData.append("name", name);
  formData.append("class", shift);

  const avatar = document.querySelector("#avatar");
  formData.append("avarta", avatar.files[0]);

  let method = id === "" ? "POST" : "PUT";
  let endpointUrl = id === "" ? endpoint : `${endpoint}/${id}`;

  fetch(endpointUrl, {
    method: method,
    headers: { Accept: "application/json" },
    body: formData,
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);

      let modal = document.getElementById("exampleModal");
      modal.addEventListener("hidden.bs.modal", clearModalFields);
      let modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      getAllData();
    });
}

function getData(card) {
  document.getElementById("modalTitle").innerHTML = "Update Student";
  displayImage.style.display = "block";

  let id = card.parentElement.parentElement.parentElement.querySelector(".id").innerHTML;
  let name = card.parentElement.parentElement.parentElement.querySelector(".card-title").innerHTML;
  let shift = card.parentElement.parentElement.parentElement.querySelector(".card-text").innerHTML;
  let image = card.parentElement.parentElement.parentElement.querySelector(".image-test").innerHTML;

  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("shift").value = shift;
  document.getElementById("image").src = image;
}

let modal = document.getElementById("exampleModal");
modal.addEventListener("hidden.bs.modal", clearModalFields);

function search() {
  let searchValue = document.getElementById("search").value;

  fetch(endpoint + "?name=" + searchValue)
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
      let card = "";
      json.data.forEach((element) => {
        card += `
          <div class="col-3">
            <div class="card h-100">
              <div class="image">
                <span class="d-none image-test">${element.avarta}</span>
                 <img src="${element.avarta}" class="card-img-top" alt="profile">
              </div>
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <span class="d-none id">${element.id}</span>
                  <h5 class="card-title">${element.name}</h5>
                  <p class="card-text">${element.class}</p>
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
    document.querySelector(".row").innerHTML = card;
  });
}

function deleteItem(card) {
  let del = card.parentElement.parentElement.querySelector(".id").innerHTML;
  fetch(endpoint + "/" + del, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((json) => {
      card.closest(".col-3").remove();
    });
}
