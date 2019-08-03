console.log("konek lur")

var addPetBtn = $('#btnAddPet')
// console.log(addPetBtn)
var petList = JSON.parse(localStorage.getItem('pet-cobaa'))

console.log(petList);
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
    })
}
console.log(petList);

addPetBtn.on("click", addPet)
fillExplorePets(petList, $('.listExplore'))
fillFavoritePets(petList, $('.listFavorite'))

console.log($('.listExplore'))

function addPet(){
    
    var petName = $('#inputPetName').first().val()
    var petDesc = $('#inputPetDesc').first().val()
    var petImage = $('#inputPetImage').first().val()
    var petItem = {
        name: petName,
        desc: petDesc,
        image: petImage,
        loved: false,
    }
    
    console.log(petItem)
    petList.push(petItem)
    
    $('#inputPetName').first().val('')
    $('#inputPetDesc').first().val('')
    $('#inputPetImage').first().val('')
    
    savePet()
    
    console.log(petList)
    var target = $('.listExplore')
    fillExplorePets(petList, target)
}

function fillExplorePets(arr, targetElement){
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
                            
                            <i class="fa-heart love ${pet.loved ? "fas" : "far"}" id="loved" data-index=${index}></i>
                            <!-- <i onclick="toggleFavorite(this)" class="fa-heart far love" id="loved"></i> -->
                            
                            <button type="button" class="btn btn-rounded btn-md ml-4 btn-tosca" data-dismiss="modal">Close</button>
    
                        </div>
                        
                    </div>
                    <!--/.Content-->
                    
                </div>
            </div>
            `
            // modalNum++
            targetElement.html(html)
        });
    }
}

function fillFavoritePets(arr, targetElement){
    var html = ''
    
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
            targetElement.html(html)
        });
    }
}

function savePet(){
    localStorage.setItem('pet-coba', JSON.stringify(petList))
}

// function toggleFavorite(x){
//    // x.classList.toggle("fas fa-heart");

//    $(x).toggleClass('fas far')
// }
function toggleFavorite(event){
    console.log('clicked', event.target)
    var target = $(event.target)
    console.log(target);
    if(target.is('i')){
       var index = target.data('index')
       petList[index].loved = !petList[index].loved
       console.log(index)
       console.log(petList[index].loved)
    }

   $(target).toggleClass('fas far')
   savePet()
   fillFavoritePets(petList, $('.listFavorite'))
}

$('.love').on('click', toggleFavorite)

