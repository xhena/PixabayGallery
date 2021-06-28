const searchBtn = document.getElementById('searchButton');
const imageList = document.getElementById('photo');
const select = document.getElementById('results');
const paginationDiv = document.querySelector('#pagination');
let paginationContainer = document.querySelector('#paginationContainer');


let lastPage= 50;
let pageNumber = 1;
//event listeners
searchBtn.addEventListener('click', getPhotoList);

//pagination 
let loadPaginationBtns = function(midPaginationBtn){
  paginationContainer.innerHTML = '';

  let paginationButtonsList = document.createElement("ul");
  paginationButtonsList.classList.add("theButtonsList"); 
  paginationButtonsList.innerHTML = 

     `<li class="button" onclick="refreshDOM(${pageNumber-1})"><a>«</a></li>
     <li class="button" onclick="refreshDOM(1)"><a>1</a></li>
     <li class="button" onclick="refreshDOM(${midPaginationBtn-2})">${midPaginationBtn-2}</a></li>
     <li class="button" onclick="refreshDOM(${midPaginationBtn-1})">${midPaginationBtn-1}</a></li>
     <li id="pageNumber" class="button" onclick="refreshDOM(${midPaginationBtn})">${midPaginationBtn}</a></li>
     <li class="button" onclick="refreshDOM(${midPaginationBtn+1})">${midPaginationBtn+1}</a></li>
     <li class="button" onclick="refreshDOM(${midPaginationBtn+2})">${midPaginationBtn+2}</a></li>
     <li class="button" onclick="refreshDOM(${lastPage})">${lastPage}</li>
     <li class="button" onclick="refreshDOM(${pageNumber+1})">»</a></li>`


     
     paginationContainer.appendChild(paginationButtonsList);      
}


let refreshDOM = function(pageToLoad){
  if (1 > pageToLoad || pageToLoad > lastPage) {
     return;
  }
  // set global pageNumber variable
  pageNumber = pageToLoad;
  getPhotoList(pageToLoad);
}

let initDOM = function(pageToLoad){
 
  getPhotoList(pageToLoad);
}

initDOM(1);

//merr foto qe matches me te dhenat

 function getPhotoList() {

  let searchInputTxt = document.getElementById('searchField').value.trim();
  fetch(`https://pixabay.com/api/?key=21910401-fadf0a5f730b4deb6fcffc632&q=${searchInputTxt}&page=${pageNumber}&per_page=${select.value}`)
    .then(Response => Response.json())
    .then(data => {
      let html = "";
      if (data.hits) {

        lastPage = Math.ceil(data.totalHits/9);
            if (pageNumber < 4){
               loadPaginationBtns(4);
            }else if(pageNumber>(lastPage-3)){
              loadPaginationBtns(lastPage-3);
            } else {
               loadPaginationBtns(pageNumber);
            }

        data.hits.forEach(hits => {
          html += `
            <div class="col-lg-4" data-id = "${hits.id}">
          <div class="image">
              <img src ="${hits.webformatURL}" alt="photos">
        
              </div>
			  <div class="row social">
			  <div class="col-lg-4">
			  			  <div class="likes">
              <i class="fas fa-thumbs-up"></i>
              <p class="teksti">${hits.likes}</p>
            </div>
			  </div>
        <div class="col-lg-4">
        <div class="comments">
          <i class="far fa-comment"></i>
          <p class="teksti">${hits.comments}</p>
        </div>
        </div>
			<div class="col-lg-4">
            <div class="favorites">
              <i class="far fa-star"></i>
              <p class="teksti">${hits.favorites}</p>
            </div>
            </div>
			
			  </div>
              
            </div>
        
        </div>
          
            `;


        })



      }

      imageList.innerHTML = html;

    });

  }
 
select.addEventListener('change', getPhotoList);