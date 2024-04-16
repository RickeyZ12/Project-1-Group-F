//Bulma modal open and close functionality


// document.addEventListener('DOMContentLoaded', () => {
//     // Functions to open and close a modal
//     function openModal($el) {
//       $el.classList.add('is-active');
//     }
  
//     function closeModal($el) {
//       $el.classList.remove('is-active');
//     }
  
//     function closeAllModals() {
//       (document.querySelectorAll('.modal') || []).forEach(($modal) => {
//         closeModal($modal);
//       });
//     }
  
    // Add a click event on buttons to open a specific modal
    // (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    //   const modal = $trigger.dataset.target;
    //   const $target = document.getElementById(modal);
  
    //   $trigger.addEventListener('click', () => {
    //     openModal($target);
    //   });
    // });
  
    // Add a click event on various child elements to close the parent modal
    // (document.querySelectorAll(/*.modal-background,*/'.modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    //   const $target = $close.closest('.modal');
  

    //   $close.addEventListener('click', () => {
    //     closeModal($target);
    //   });
    // });
  


    

     //Added code gb
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

    
    
     function getLocalStorage () {
        let reservationCard = JSON.parse(localStorage.getItem('reservationCard')) || {}
        return reservationCard
    }

     
    
    
    
    
    
    function createReservationCard () {   
        
        reservationCard = getLocalStorage()

        reservationCardEl.innerHTML = ''
        if (Object.keys(reservationCard).length == 0) {
            console.log('empty object')            
            return
        }       
    
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

         deleteReservationsBtn.addEventListener("click", () => {
            
            console.log(confirm)
            if(!confirm("This will cancel your reservation and you must submit another. Do you wish to cancel?")) {
                console.log("false")
                return
            }
            else {
            console.log("true")
            reservationCardEl.innerHTML = 'Your Reservation has been cancelled. Please click above if you wish to make new reservations.'
            localStorage.removeItem('reservationCard')
            console.log('clicked')
            }
         })
     }     




    
    function openModal () {
        const errorMessage = document.createElement("p") 
        modalContainer.appendChild(errorMessage)
        
        submitModalBtn.addEventListener("click", function(e) {
            e.preventDefault();
            let fName = fNameEl.value; //.slice(0,1).toUpperCase().slice(1,fNameEl.length).toLowerCase()    
            let lName = lNameEl.value;
            let phoneACode = phoneACodeEl.value;
            let phoneThree = phoneThreeEl.value;
            let phoneFour = phoneFourEl.value;
            let email = emailEl.value;
            let date = dateEl.value;
            let hour = hourEl.value;
            
            console.log(date)
                   
            //Handle any required fields
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
            let phone = `(${phoneACode}) ${phoneThree}-${phoneFour}`
            
            const reformatDate = dayjs(date).format('dddd, MMMM D YYYY,');
            
         
            
            
            let reservationCard = {
                name: fName + ' ' + lName,
                phone: phone,
                email: email,
                date: reformatDate,
                hour: hour
            }

            
            

            localStorage.setItem('reservationCard', JSON.stringify(reservationCard))
            
            createReservationCard()
            
            modalWindow.classList.remove('is-active')

            fNameEl.value = ""
            lNameEl.value = ""
            phoneACodeEl.value = ""
            phoneThreeEl.value = ""
            phoneFourEl.value = ""
            dateEl.value = ""
            emailEl.value = ""
            hourEl.value = ""
            
            } //end else statement.  must comment back

           
              
            })//end submit button

            
    }// end openModl()


    
    
    
    
    
    
    const reservationBtn = document.querySelector(".js-modal-trigger");

    reservationBtn.addEventListener("click", function () {
        modalWindow.classList.add('is-active')
        openModal()
    })

    closeModal.addEventListener("click", function () {
        modalWindow.classList.remove('is-active')
    })


  // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModal();
      }
    });


    //JQuery UI date picker for calendar in input field
    $('#reservationDate').datepicker({
        changeMonth: true,
        changeYear: true,
      });

   
      
createReservationCard();


