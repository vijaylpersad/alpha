const fs = require('fs');
const csv = require('@fast-csv/parse');

// const csvOutput = require('@fast-csv/format');
// const stream = csvOutput.format({ headers: true});

const { format } = require('@fast-csv/format');

const csvStream = format({ headers: true});
const csvSubjectStream = format({ headers: true});

const appData = fs.createWriteStream('appdata.csv')
const subjectData = fs.createWriteStream('subjectdata.csv')

csvStream.pipe(appData).on('end', () => console.log('done'));
csvSubjectStream.pipe(subjectData).on('end', () => console.log('done'));


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
                lLAppData['level'] = 0
                lLAppData[app] = minutes
            } else {
                lLAppData['level'] = 0
                lLAppData[app] = minutes + lLAppData[app]        
            }
        }

        if(level === 0.5){
            if (lincAppData[app]===undefined){
                lincAppData['level'] = 0.5
                lincAppData[app] = minutes
            } else {
                lincAppData['level'] = 0.5
                lincAppData[app] = minutes + lincAppData[app]        
            }
        }

        if(level === 1){
            if (lOneAppData[app]===undefined){
                lOneAppData['level'] = 1
                lOneAppData[app] = minutes
            } else {
                lOneAppData['level'] = 1
                lOneAppData[app] = minutes + lOneAppData[app]        
            }
        }

        if(level === 2){
            if (lTwoAppData[app]===undefined){
                lTwoAppData['level'] = 2
                lTwoAppData[app] = minutes
            } else {
                lTwoAppData['level'] = 2
                lTwoAppData[app] = minutes + lTwoAppData[app]        
            }
        }

        if(level === 3){
            if (lThreeAppData[app]===undefined){
                lThreeAppData['level'] = 3
                lThreeAppData[app] = minutes
            } else {
                lThreeAppData['level'] = 3
                lThreeAppData[app] = minutes + lThreeAppData[app]        
            }
        }
    
        //time in app by app
        if (timeInApp[app]===undefined){
            timeInApp['level'] = 'total'
            timeInApp[app] = minutes
        } else {
            timeInApp['level'] = 'total'
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
        csvSubjectStream.write(timeInSubject)
       
        console.log('Minutes Spent in Apps by App:', timeInApp)
        csvStream.write(timeInApp)

        console.log('LL minutes in apps:', lLAppData)
        console.log('Linc minutes in apps:', lincAppData)
        console.log('L1 minutes in apps:', lOneAppData)
        console.log('L2 minutes in apps:', lTwoAppData)
        console.log('L3 minutes in apps:', lThreeAppData)
        csvStream.write(lLAppData)
        csvStream.write(lincAppData)
        csvStream.write(lOneAppData)
        csvStream.write(lTwoAppData)
        csvStream.write(lThreeAppData)
        
        csvSubjectStream.end()
        csvStream.end()
        
    });

  


    



