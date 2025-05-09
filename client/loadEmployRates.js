/*
Name : Aung Pyae Phyo
Class : DIT/1B/09
Admin No. : 2329581
*/

// import the functions from fetchData.js
import {getUniversityYearData} from './fetchData.js'
import {getUniversityList} from './fetchData.js'

const alertMsg = document.querySelector("#alertMsg");
const selectUni = document.getElementById("selectUni");
const rateDiv = document.querySelector("#rateDiv");

// fetch data from endpoint and turn the data array into web components
async function main() {
    let uniArray;
    try {
        uniArray = await getUniversityList();
    } catch (error) {
        console.error('Error Detected:',error);
        // alert('Server temporarily unavailable');
        alertMsg.classList.remove("d-none"); 
        alertMsg.innerText = "Server temporarily unavailable";
        return;
    }
    
    const submitForm = document.getElementById("submitForm");
    
    uniArray.forEach(uni => {
        const option = document.createElement('option');        // create a new option element
    
        // set the value and text context of the option
        option.value = uni.name;
        option.textContent = uni.name;
    
        selectUni.appendChild(option);      // append the option
    });

    submitForm.addEventListener("submit", () => {
        event.preventDefault();
        
        console.log('The list of the universities :',uniArray);

        const yr = document.querySelector("#year").value;
        const uniName = document.getElementById("selectUni").value;

        let code = null;
        uniArray.forEach(uni => {
            if (uni.name === uniName) {
                code = uni.code;
            }
        });
        console.log(code);
        
        rateDiv.innerHTML = '';       // clear the rateDiv container every time the form submits
        alertMsg.classList.add("d-none");       // set initial state of alertMsg to display none
        
        if (yr < 2013 || yr > 2021) {       // if the year is out of range
            alertMsg.classList.remove("d-none"); 
            alertMsg.innerText = "Please choose a year between 2013 and 2021 inclusive";
            return;
        } 
        
        // consume the promise
        getUniversityYearData(code,yr)
        .then((dataArray) => { 
            if (dataArray.length == 0) {
                alertMsg.classList.remove("d-none");
                alertMsg.innerText = `No data available for ${uniName} for year ${yr}`;
                return;
            }

            dataArray.sort((a, b) => {
                // sort by school
                if (a.school < b.school) return -1;
                if (a.school > b.school) return 1;
                // if schools are the same, continue to sort by degree
                if (a.degree < b.degree) return -1;
                if (a.degree > b.degree) return 1;
                // if not, remains same
                return 0;
            });

            dataArray.forEach(entry => {
                console.log(entry);
                const newEntry = document.createElement('data-card-2');
                newEntry.setAttribute('school', entry.school);
                newEntry.setAttribute('rate', entry.employment_rate_ft_perm + '%');
                newEntry.setAttribute('degree', entry.degree);
                rateDiv.append(newEntry);
                // add the component to the rateDiv
            });
        })
        .catch((error) => {         // if any error is found during the fetch process
            console.error('Error Detected:',error);
            alertMsg.classList.remove("d-none"); 
            alertMsg.innerText = "Server temporarily unavailable";
        })
    });
}

// run the main function as soon as the webpage loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");
    main(); 
});


