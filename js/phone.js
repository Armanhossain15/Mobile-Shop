const loadPhone= async(inputText=13, isShowAll)=> {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
    // .then(res => res.json());
    // .then(data => console.log(data));
    const data = await  res.json();
    const phones= data.data
    displayPhones(phones, isShowAll);
}

const handleSearch =(isShowAll) =>{
    toggleLoadingSpinner(true)
    const inputField =  document.getElementById('input-field')
    const searchText = inputField.value
    loadPhone(searchText, isShowAll)
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''
    // console.log(phones.length)

    //show all button
    const btnShowAll = document.getElementById('btn-show-all')
    if(phones.length > 12 && !isShowAll){
        btnShowAll.classList.remove('hidden')
    }
    else{
        btnShowAll.classList.add('hidden')
    }
    // console.log('is show all', isShowAll)
    //slice phone if not show all
    if(!isShowAll){
        phones= phones.slice(0, 12)
    }
    
    

    for (const phone of phones) {
        // console.log(phone)
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card w-96 bg-base-100 shadow-lg`
        phoneCard.innerHTML = `
                    <figure class="px-4 pt-4">
                        <img src="${phone.image}" alt="Shoes"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>There are many variations of passages of available, but the majority have suffered</p>
                        <h4 class ="font-bold text-2xl py-2" >$999</h4>
                        <div onclick="handleShowDetails('${phone.slug}')" class="card-actions">
                            <button class="btn text-xl font-semibold  bg-[#0D6EFD] hover:bg-[#0a5cd7]  text-white  btn-wide">Show Details</button>
                        </div>
                    </div>
        `
        
        phoneContainer.appendChild(phoneCard)
    }
    //hide loading
    toggleLoadingSpinner(false)
}

const toggleLoadingSpinner =isLoading => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

//handle show all
const handleShowAll=()=>{
    handleSearch(true)
}

//show details in modal
const handleShowDetails= async(id)=>{
    console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data =await  res.json()
    const innerData = data.data
    showPhoneDetails(innerData)
}

const showPhoneDetails = phone =>{
    console.log(phone)
    show_Details_modal.showModal()
    const deatailModal = document.getElementById('deatail-modal')
    const div = document.createElement('div')
    
    div.innerHTML=`
   <div class="flex justify-center "><img src= '${phone.image}'/></div>
   <h1 class="text-3xl font-bold py-4 text-center">${phone.name}</h1>
   <p class= "text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
   <h2 class=' pt-2 text-md'><b>Storage</b>${phone.mainFeatures.storage}</h2>
   <h2 class=' pt-2 text-md'><b>Display Size</b>${phone.mainFeatures.displaySize}</h2>
   <h2 class=' pt-2 text-md'><b>Memory</b>${phone.mainFeatures.memory}</h2>
   
    `
    deatailModal.textContent =''
    deatailModal.appendChild(div)
}

loadPhone()