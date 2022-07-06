const fs = require('fs');
const csv = require('@fast-csv/parse');

let timeInSubject = {}
let timeInApp = {}

let lLAppData = {}
let lincAppData = {}
let lOneAppData = {}
let lTwoAppData = {}
let lThreeAppData = {}

fs.createReadStream('./students/Session 1 Time.csv')
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {

        let minutes = parseInt(row["minutes_in_session"])
        let subject = row["subject"]
        let app = row["app"]

        //time spent in apps by level
        let level = parseFloat(row["level"])

        if(level === 0){
            if (lLAppData[app]===undefined){
                lLAppData[app] = minutes
            } else {
                lLAppData[app] = minutes + lLAppData[app]        
            }
        }

        if(level === 0.5){
            if (lincAppData[app]===undefined){
                lincAppData[app] = minutes
            } else {
                lincAppData[app] = minutes + lincAppData[app]        
            }
        }

        if(level === 1){
            if (lOneAppData[app]===undefined){
                lOneAppData[app] = minutes
            } else {
                lOneAppData[app] = minutes + lOneAppData[app]        
            }
        }

        if(level === 2){
            if (lTwoAppData[app]===undefined){
                lTwoAppData[app] = minutes
            } else {
                lTwoAppData[app] = minutes + lTwoAppData[app]        
            }
        }

        if(level === 3){
            if (lThreeAppData[app]===undefined){
                lThreeAppData[app] = minutes
            } else {
                lThreeAppData[app] = minutes + lThreeAppData[app]        
            }
        }
    
        //time in app by app
        if (timeInApp[app]===undefined){
            timeInApp[app] = minutes
        } else {
            timeInApp[app] = minutes + timeInApp[app]        
        }

        //time spent in apps by subject
        if (timeInSubject[subject]===undefined){
            timeInSubject[subject] = minutes
        } else {
            timeInSubject[subject] = minutes + timeInSubject[subject]        
        }
        
    })
    .on('end', rowCount => {
        console.log('Minutes Spent in Apps by Subject:', timeInSubject)
       
        console.log('Minutes Spent in Apps by App:', timeInApp)
 
        console.log('LL minutes in apps:', lLAppData)
        console.log('Linc minutes in apps:', lincAppData)
        console.log('L1 minutes in apps:', lOneAppData)
        console.log('L2 minutes in apps:', lTwoAppData)
        console.log('L3 minutes in apps:', lThreeAppData)    
        }
    );

  


    



