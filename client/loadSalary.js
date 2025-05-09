/*
Name : Aung Pyae Phyo
Class : DIT/1B/09
Admin No. : 2329581
*/

// import the function from fetchData.js
import {getYearData} from './fetchData.js'

const submitYearForm = document.getElementById("SubmitYear"); 
const alertMsg = document.querySelector("#alertMsg");
const salaryDiv = document.querySelector("#salaryDiv");


// fetch data from endpoint and turn the data array into your web component
async function main() {
    
    submitYearForm.addEventListener("submit", () => {
        event.preventDefault();
        
        const yearInput = document.querySelector("#year").value;

        salaryDiv.innerHTML = '';       // clear the salaryDiv container every time the form submits
        alertMsg.classList.add("d-none");       // set initial state of alertMsg to display none
        
        // consume the promise 
        getYearData(yearInput)        
        .then((dataArray) => { 
            if (dataArray.length == 0) {        // if data array is empty, then the year is out of range
                alertMsg.classList.remove("d-none"); 
                alertMsg.innerText = "Please choose a year between 2013 and 2021 inclusive";
                return;
            }

            // sort the array in descending median salaries
            dataArray.sort((a,b) => b.basic_monthly_median - a.basic_monthly_median);
            // extract the top ten array elements
            const topTen = dataArray.slice(0,10);

            topTen.forEach(entry => {
                const displayItem = document.createElement("div");
                displayItem.className ="col-lg-4 col-md-6 col-sm-12 p-2";
                displayItem.innerHTML = `
                <data-card-1 uni_name="${entry.university}" school="${entry.school}" degree="${entry.degree}" median_salary="${entry.basic_monthly_median}"></data-card-1>
                `;
                salaryDiv.appendChild(displayItem);  
                // add the component into salaryDiv       
            });
        })
        .catch((error) => {         // if there is error during the fetching process
            console.error('Error Detected:',error);
            // alert('Server temporarily unavailable')
            alertMsg.classList.remove("d-none"); 
            alertMsg.innerText = "Server temporarily unavailable";
            return;
        })
    });
}

// run the main function as soon as the webpage loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");
    main();
})