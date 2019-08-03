console.log("Connection success!");

let addPetBtn = document.querySelector('#btnAddPet');
let petList = JSON.parse(localStorage.getItem('pets-2'));

console.log(petList)
if (petList === null) {
    petList = [];
    let petItems = [
        {
            name: 'Molly',
            desc: 'I enjoy naps in medium-sized boxes and staring. I guess you can say staring is my favorite hobby.',
            image: 'https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            loved: false
        },
        {
            name: 'Sasa',
            desc: 'I’m not interested in anything but a box. I’m not even picky, I just want a place to sleep.',
            image: 'https://images.unsplash.com/photo-1507984211203-76701d7bb120?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80',
            loved: false
        },
        {
            name: 'Tiger',
            desc: 'I like to be in charge, so don’t answer my ad unless you like to be bossed around and swatted when you’re sleeping in my favorite spots.',
            image: 'https://images.unsplash.com/photo-1491485880348-85d48a9e5312?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
            loved: false
        },

    ]
    petItems.forEach(function (item){
        petList.push(item);
    });

    savePet();
}

console.log(petList);
// console.log(document.getElementsByClassName('listExplore')[0])
// console.log(addPetBtn)

if (addPetBtn !== null) {
    addPetBtn.addEventListener('click', addPet);    
}

let listExplore = document.querySelector('.listExplore');
let listFavorite = document.querySelector('.listFavorite');

if (listExplore !== null) {
    fillExplorePets(petList, listExplore);
}
if (listFavorite !== null) {
    fillFavoritePets(petList, listFavorite);
}


function addPet() {
    let petName = document.querySelector('#inputPetName');
    let petDesc = document.querySelector('#inputPetDesc');
    let petImage = document.querySelector('#inputPetImage');
    let petItem = {
        name: petName.value,
        desc: petDesc.value,
        image: petImage.value,
        loved: false
    }
    console.log(petItem);

    petList.push(petItem);

    petName.value = '';
    petDesc.value = '';
    petImage.value = '';

    savePet();

    let target = document.querySelector('.listExplore');
    fillExplorePets(petList, target);
}


function savePet() {
    localStorage.setItem('pets-2', JSON.stringify(petList));
}

function fillExplorePets(arr, targetElement) {
    var html = ''
    
    if (arr !== null) {
        arr.forEach(function(pet, index) {
            html += `
            <div class="col-sm-4 d-flex">
                    <div class="card" style="width: 22rem;" data-toggle="modal" data-target="#modal-${pet.name}">
                            <img src="${pet.image}" class="card-img-top" alt="">
                            <div class="card-body">
                        <h2 class="card-title" id="petName">${pet.name}</h2>
                        <p class="card-text" id="petDesc">${pet.desc}</p>
                   </div>
                </div>
            </div>
    
            <div class="modal fade" id="modal-${pet.name}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    
                    <!--Content-->
                    <div class="modal-content">
                        <!--Body-->
                        <div class="modal-body mb-0 p-0">                                        
                            <img src="${pet.image}" alt="" style="width:100%">
                        </div>
                        <!-- <p class="card-text" id="petDesc">${pet.desc}</p> -->
                        <!--Footer-->
                        <div class="modal-footer ">
                            <!-- <span class="mr-4">Do you love it?</span> -->
                            <!--Favorite-->
                            
                            <!-- <i class="fa-heart love ${pet.loved ? "fas" : "far"}" id="loved" data-index=${index}></i> -->
                             <i onclick="toggleFavorite(this)" class="fa-heart love ${pet.loved ? "fas" : "far"}" id="loved" data-index=${index}></i> 
                            
                            <button type="button" class="btn btn-rounded btn-md ml-4 btn-tosca" data-dismiss="modal">Close</button>
    
                        </div>
                        
                    </div>
                    <!--/.Content-->
                    
                </div>
            </div>
            `
            // modalNum++
            targetElement.innerHTML = html;
        });
    }
}

function fillFavoritePets(arr, targetElement) {
    let html = ''
    
    if (arr !== null) {
        arr.forEach(function(pet, index) {
            if(pet.loved === true){
                html += `
                <div class="col-sm-4 d-flex">
                    <div class="card" style="width: 22rem;" data-toggle="modal" data-target="#modal-${pet.name}">
                            <img src="${pet.image}" class="card-img-top" alt="">
                            <div class="card-body">
                        <h2 class="card-title" id="petName">${pet.name}</h2>
                        <p class="card-text" id="petDesc">${pet.desc}</p>
                   </div>
                </div>
            </div>
    
            <div class="modal fade" id="modal-${pet.name}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    
                    <!--Content-->
                    <div class="modal-content">
                        <!--Body-->
                        <div class="modal-body mb-0 p-0">                                        
                            <img src="${pet.image}" alt="" style="width:100%">
                        </div>
                        <!-- <p class="card-text" id="petDesc">${pet.desc}</p> -->
                        <!--Footer-->
                        <div class="modal-footer ">
                            <!-- <span class="mr-4">Do you love it?</span> -->
                            <!--Favorite-->
                        
                            <button type="button" class="btn btn-rounded btn-md ml-4 btn-tosca" data-dismiss="modal">Close</button>
    
                        </div>
                        
                    </div>
                    <!--/.Content-->
                    
                </div>
            </div>
            `
            }
            targetElement.innerHTML = html;
        });
    }
}

function toggleFavorite(event) {
    console.log('clicked', event);
    
    let index = event.getAttribute('data-index');
    petList[index].loved = !petList[index].loved;
    
    console.log(index);
    console.log(petList[index].loved);
    
    event.classList.toggle('fas');
    savePet();

    if (listFavorite !== null) {
        fillFavoritePets(petList, listFavorite);
    }
}

// let loveBtn = document.querySelector('.love');
// loveBtn.addEventListener('click', toggleFavorite);