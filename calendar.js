//Define page items
const fNameEl = document.getElementById("fName");
const lNameEl = document.getElementById("lName");
const phoneACodeEl = document.getElementById("phoneACode");
const phoneThreeEl = document.getElementById("phoneThree");
const phoneFourEl = document.getElementById("phoneFour");
const dateEl = document.getElementById("reservationDate");
const hourEl = document.getElementById("hour");
const emailEl = document.getElementById("email")
const submitModalBtn = document.getElementById("modal-submit-btn");
const reservationCardEl = document.querySelector("#reservations-card-container")
const modalWindow = document.querySelector('.modal')
const closeModal = document.querySelector(".modal-close")
const modalContainer = document.querySelector("#modal-input-cont")
const reservationBtn = document.querySelector(".js-modal-trigger");

    
//Get reservation from local storage  
function getLocalStorage () {
let reservationCard = JSON.parse(localStorage.getItem('reservationCard')) || {}
return reservationCard
}  

//Create reservation information and display on page
    
function createReservationCard () {   
        
    reservationCard = getLocalStorage()

    reservationCardEl.innerHTML = '';

    //If nothing in local storage
    if (Object.keys(reservationCard).length == 0) {
        console.log('empty object')            
        return
    }       

    //Display reservations within specified div
    let nameH3 = document.createElement("h3")
    nameH3.textContent = "Name: " + reservationCard.name
    reservationCardEl.appendChild(nameH3)

    let phoneP = document.createElement("p");
    phoneP.textContent = "Phone: " + reservationCard.phone;
    reservationCardEl.appendChild(phoneP)

    let emailP = document.createElement("p");
    emailP.textContent = "Email: " + reservationCard.email  
    reservationCardEl.appendChild(emailP);

    let reservationTitle = document.createElement("h1")
    reservationTitle.textContent = "Your Reservation is for:"
    reservationCardEl.appendChild(reservationTitle);

    
    let dateH3 = document.createElement("h1")
    dateH3.textContent = reservationCard.date + " " + reservationCard.hour
    reservationCardEl.appendChild(dateH3) 
    
    const deleteReservationsBtn = document.createElement("button")
    deleteReservationsBtn.textContent = "Delete Reservations"
    deleteReservationsBtn.setAttribute("class", "button is-small is-danger")
    reservationCardEl.appendChild(deleteReservationsBtn)

    //Delete reservation button
    deleteReservationsBtn.addEventListener("click", () => {
    
        //Alert to confirm deletion
        if(!confirm("This will cancel your reservation and you must submit another. Do you wish to cancel?")) {
            console.log("false")
            return
        }
        else {
        reservationCardEl.innerHTML = 'Your Reservation has been cancelled. Please click above if you wish to make new reservations.'
        localStorage.removeItem('reservationCard')    
        }
    })
}     

//Open modal window to enter in reservation information from inputs and close modal
function openModal () {
    
    //Create paragraph element for error message to display dynamic text content
    const errorMessage = document.createElement("p");
    modalContainer.appendChild(errorMessage);
        
    submitModalBtn.addEventListener("click", function(e) {
        e.preventDefault();
        
        //Get values from input fields
        let fName = fNameEl.value; //.slice(0,1).toUpperCase().slice(1,fNameEl.length).toLowerCase()    
        let lName = lNameEl.value;
        let phoneACode = phoneACodeEl.value;
        let phoneThree = phoneThreeEl.value;
        let phoneFour = phoneFourEl.value;
        let email = emailEl.value;
        let date = dateEl.value;
        let hour = hourEl.value;   
           
                   
        //Force certain fields to entered correctly
        if(isNaN(phoneACode) || phoneACode.length !==3) {
            errorMessage.textContent = "Please enter a valid area code"                
        }

        else if(isNaN(phoneThree) || phoneThree.length !==3) {
            errorMessage.textContent = "Please enter a valid phone number (first three)"                
        }

        else if(isNaN(phoneFour) || phoneFour.length !==4) {
            errorMessage.textContent = "Please enter a valid phone number (last four)"                
            }

        else if (hour == "noHour") {
            errorMessage.textContent = "Please select an hour"
        }

        else if (date == "") {
            errorMessage.textContent = "Please choose a date"
        }

        else {
            //Reformat items to display on page properly
            let phone = `(${phoneACode}) ${phoneThree}-${phoneFour}`
            let reformatDate = dayjs(date).format('dddd, MMMM D YYYY,');
            
            //Create reservationCard object
            let reservationCard = {
                name: fName + ' ' + lName,
                phone: phone,
                email: email,
                date: reformatDate,
                hour: hour
            }            

            //Set to local storage
            localStorage.setItem('reservationCard', JSON.stringify(reservationCard))
            
            createReservationCard()
            
            //Close modal window
            modalWindow.classList.remove('is-active')

            //Clear in put fields
            fNameEl.value = ""
            lNameEl.value = ""
            phoneACodeEl.value = ""
            phoneThreeEl.value = ""
            phoneFourEl.value = ""
            dateEl.value = ""
            emailEl.value = ""
            hourEl.value = ""
            
        } //end else statement.

    })//end submit button

    //JQuery UI date picker for calendar in input field
    $('#reservationDate').datepicker({
        changeMonth: true,
        changeYear: true,
    });

    //X button in top right of modal. Click to close modal
    closeModal.addEventListener("click", function () {
        modalWindow.classList.remove('is-active')
    })

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if(event.key === "Escape") {
            closeAllModal();
        }
    });
            
}// end openModl()


//Click reservation button on page to bring up modal
reservationBtn.addEventListener("click", function () {
    modalWindow.classList.add('is-active')
    openModal()
})  
      
//Create reservations on page load and will create from local storage if something previously entered
createReservationCard();

