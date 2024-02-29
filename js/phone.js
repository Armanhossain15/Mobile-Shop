const loadPhone= async(inputText)=> {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
    // .then(res => res.json());
    // .then(data => console.log(data));
    const data = await  res.json();
    const phones= data.data
    displayPhones(phones);
}

const handleSearch =() =>{
    const inputField =  document.getElementById('input-field')
    const searchText = inputField.value
    loadPhone(searchText)
}

const displayPhones = phones =>{
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''
    console.log(phones.length)
    const btnShowAll = document.getElementById('btn-show-all')
    if(phones.length > 12){
        btnShowAll.classList.remove('hidden')
    }
    else{
        btnShowAll.classList.add('hidden')
    }
    phones= phones.slice(0, 12)
    

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
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button class="btn text-xl font-semibold  bg-[#0D6EFD] text-white  btn-wide">Show Details</button>
                        </div>
                    </div>
        `
        phoneContainer.appendChild(phoneCard)
    }
}

loadPhone()