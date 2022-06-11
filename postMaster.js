// utlity function
function getElementByString(str) {
    let div = document.createElement("div");
    div.innerHTML = str;
    return div.firstElementChild;
  }
  // selecting element by id
  let parameter = document.getElementById("parameter");
  let requestJson = document.getElementById("requestJson");
  let jsonRadio = document.getElementById("jsonRadio");
  let customJson = document.getElementById("customJson");
  
  // Initaling hiding paramter box
  parameter.style.display = "none";
  
  // If json redio click then show request json box
  jsonRadio.addEventListener("click", () => {
    parameter.style.display = "none";
    requestJson.style.display = "block";
  });
  
  // If costum redio click then show request custom parameter box
  customJson.addEventListener("click", () => {
    parameter.style.display = "block";
    requestJson.style.display = "none";
  });
  
  // initlizing count var for counteing the paramter box
  let countParam = 2;
  
  // function for creating more parameter box
  let addParam = document.getElementById("addParam");
  addParam.addEventListener("click", () => {
    let str = `<div class="d-flex my-3">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Parameter ${countParam}</label>
                  <input id="parameterKey${countParam}" type="text" class="form-control me-5 " placeholder="parameter key"
                      aria-label="parameter key">
                  <input id="parameterParameter${countParam}" type="text" class="form-control me-5"
                      placeholder="parameter value" aria-label="parameter value">
                  <button id="deleteParam" onclick=deleteParam(this) class="btn btn-primary mx-2 me-5" ><sapn> - </sapn> </button>
              </div>`;
    parameter.appendChild(getElementByString(str));
    countParam++;
  });
  
  // Creating function for delete paramater
  function deleteParam(elem) {
    elem.parentElement.remove();
    countParam--;
  }
  
  // selecting type the user want to perform
  // If user clicked to submit button
  let submit = document.getElementById("submit");
  submit.addEventListener("click", () => {
    // debugging
    let url = document.getElementById("url").value;
    let requestType = document.querySelector(
      "input[name=requestType]:checked"
    ).value;
    let contantType = document.querySelector(
      "input[name=contantType]:checked"
    ).value;
    //   console.log(url, requestType, contantType);
  
    // if user select custom param then collecting all value to json
    let data = {};
    if (contantType == "param") {
      for (let i = 0; i < countParam - 1; i++) {
        let currKey =
          parameter.children[i].firstElementChild.nextElementSibling.value;
        let currValue =
          parameter.children[i].firstElementChild.nextElementSibling
            .nextElementSibling.value;
        data[currKey] = currValue;
      }
      //   converting json file to string
      data = JSON.stringify(data);
      console.log(data);
    } else {
      data = document.getElementById("requestJsonBox").value;
    }
  
    // if user select json then fathch api
    let responseJson = document.getElementById("responseJson");
    if (requestType == "get") {
      fetch(url)
        .then((res) => res.text())
        .then((data) => {
          responseJson.value = data;
        });
    } else {
      fetch(url, {
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.text())
        .then((data) => {
          responseJson.value = data;
        });
    }
  });
  