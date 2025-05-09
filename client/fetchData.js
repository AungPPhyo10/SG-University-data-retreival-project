/*
Name : Aung Pyae Phyo
Class : DIT/1B/09
Admin No. : 2329581
*/

// const readline = require("readline-sync");
// const fetch = require("node-fetch");

// fetch university names and codes data list 
export function getUniversityList() {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8081/university')
            .then(response => response.json())
            .then(function (data) {
                resolve(data)
            })
            .catch(error => reject(error));
    });
}

// fetch data of a specific year
export function getYearData(yr) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8081/year/${yr}`)
            .then(response => response.json())
            .then(function (data) {
                resolve(data)
            })
            .catch(error => reject(error));
    });
}

// fetch data of a specific university on a specific year
export function getUniversityYearData(code, yr) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8081/university/${code}/year/${yr}`)
            .then(response => response.json())
            .then(function (data) {
                resolve(data)
            })
            .catch(error => reject(error));
    });
}


