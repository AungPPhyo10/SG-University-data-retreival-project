const express = require('express');
const path    = require('path');
const util    = require('util');
const fs      = require('fs');
const app     = express();
const parse   = require("csv-parse").parse;

const cors = require('cors');
app.use(cors());

const uniCodeMap = new Map ([
   ["NTU", "Nanyang Technological University"]
   ,["NUS", "National University of Singapore"]
   ,["SMU", "Singapore Management University"]
   ,["SIT", "Singapore Institute of Technology"]
   ,["SUTD", "Singapore University of Technology and Design"]
   ,["SUSS", "Singapore University of Social Sciences"]
]);

let data2023;

app.use(express.json());

// display basic information from request 
app.use((req, res, next) => {
   console.log(`requesting: ${req.url}`);
   console.log(`method: ${req.method}`);
   console.log(`path: ${req.path}`);
   console.log('Body Object');
   console.log(util.inspect(req.body, { depth: null }));
   next();
});

function getUniCode(university) {
   let result = "na";
   uniCodeMap.forEach((value, key) => {
      if (value == university) {         
        result = key;
      }
   });
   return result;
}

// read data from csv file 
function readAllData() {
   return new Promise((resolve, reject) => {
      const rData = [];
      fs.createReadStream(".\\data\\GraduateEmploymentSurvey.csv")
         .pipe(parse({ delimiter: ',', from_line: 2 }))
         .on('data', function (csvrow) {
            csvrow[2] = csvrow[1] == "Singapore University of Technology and Design" ? "SUTD" : csvrow[2];
            if (!csvrow.includes("na")) {
               let newRecord = {
                  year                     : csvrow[0],
                  uni_code                 : getUniCode(csvrow[1]),
                  university               : csvrow[1],
                  school                   : csvrow[2],
                  degree                   : csvrow[3],
                  employment_rate_overall  : parseFloat(csvrow[4]),
                  employment_rate_ft_perm  : parseFloat(csvrow[5]),
                  basic_monthly_mean       : parseFloat(csvrow[6]),
                  basic_monthly_median     : parseFloat(csvrow[7]),
                  gross_monthly_mean       : parseFloat(csvrow[8]),
                  gross_monthly_median     : parseFloat(csvrow[9]),
                  gross_mthly_25_percentile: parseFloat(csvrow[10]),
                  gross_mthly_75_percentile: parseFloat(csvrow[11])
               }
               rData.push(newRecord);
            }
         })
         .on('end', function () {
            resolve(rData)
         })
         .on('error', function (err) {
            reject(err);
         });
   });
}

// API ENDPOINTS
// This responds with " Nothing" on the homepage
app.get('/', function (req, res) {
   console.log("Host data ready");
   res.send('Your Data Host!');
})

// all records e.g. http://localhost:8081/all
app.get('/all', (req, res) => {   
   res.status(200);
   res.type('application/json');
   res.json(data2023);   
});

// get all records of a given year e.g. http://localhost:8081/year/2019
app.get('/year/:year', (req, res) => {
   let year = req.params.year;
   const result = data2023.filter((uni) => { return uni.year == year})
   res.status(200);
   res.type('application/json');
   res.json(result);   
});

// get university list, e.g. http://localhost:8081/university
app.get('/university', (req, res) => {
   const result = Array.from(uniCodeMap, ([key, value]) => {
      return {
         code: key,
         name: value
      };
    });
   res.status(200);
   res.type('application/json');
   res.json(result);   
});

// get records via university code, e.g. http://localhost:8081/university/NUS
app.get('/university/:uniCode', (req, res) => {
   let uniCode = req.params.uniCode;
   const result = data2023.filter((uni) => { return uni.uni_code == uniCode})
   res.status(200);
   res.type('application/json');
   res.json(result);   
});

// get records via university code and year, e.g. http://localhost:8081/university/SUTD/year/2020
app.get('/university/:uniCode/year/:year', (req, res) => {
   let uniCode = req.params.uniCode;
   let year = req.params.year;
   const result = data2023.filter((uni) => { return uni.uni_code == uniCode}).filter((uni) => { return uni.year == year});
   res.status(200);
   res.type('application/json');
   res.json(result);   
});

// prepare data then start server
readAllData().then((alldata) => {
   data2023 = alldata;
   const server = app.listen(8081, 'localhost', () => {
      const host = server.address().address
      const port = server.address().port
      console.log(`Example app listening at http://${host}:${port}`);
   })
}).catch((error) => {
   console.log("Error:", error)
});
// to run the server: node server