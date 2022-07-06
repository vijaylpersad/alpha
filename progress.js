const fs = require('fs');
const csv = require('@fast-csv/parse');

    let lLProgress = {}
    let lincProgress = {}
    let l1Progress = {}
    let l2Progress = {}
    let l3Progress = {}

    let lLComplete = 0
    let lLIncomplete = 0

    let lincComplete = 0
    let lincIncomplete = 0

    let l1Complete = 0
    let l1Incomplete = 0

    let l2Complete = 0
    let l2Incomplete = 0

    let l3Complete = 0
    let l3Incomplete = 0


    let studentGoalFileNames = {
        '0': './students/LL Operations - Austin, TX.csv',
        '0.5': './students/Linc Operations - Austin, TX.csv',
        '1': './students/L1 Operations - Austin, TX.csv',
        '2': './students/L2 Operations - Austin, TX.csv',
        '3': './students/L3 Operations - Austin, TX.csv'
    }
    fs.createReadStream('./students/Session 1 Progress.csv')
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', currentProgress => {
        let level = currentProgress['level']
        // level = '2'
        let currentStudentSessionGoalsFile = studentGoalFileNames[level]
        //let currentStudentSessionGoalsFile = studentGoalFileNames['2'] = 'students/L2 Operations - Austin, TX.csv'
        
        let studentID = currentProgress['student_id']
        let app = currentProgress['app']
        let appProgress = currentProgress['units_in_session']
        let subject = currentProgress['subject']
        let progressAppAndSubjectKey = `${app} - ${subject}`
       
        
        fs.createReadStream(currentStudentSessionGoalsFile)
        .pipe(csv.parse({headers: true}))
        .on('error', error => console.error(error))
        .on('data', sessionGoal => {
            let sessionGoalID = sessionGoal['Student & Campus ID']
            //console.log(sessionGoal)
            //console.log(sessionGoalID)

            if(sessionGoalID === studentID && level === '0'){
                let appGoal = sessionGoal[progressAppAndSubjectKey]
                if(appProgress >= appGoal){
                    lLProgress[studentID] = true
                    lLComplete++
                } else {
                    lLProgress[studentID] = false
                    lLIncomplete++
                }
            }

            if(sessionGoalID === studentID && level === '0.5'){
                let appGoal = sessionGoal[progressAppAndSubjectKey]
                if(appProgress >= appGoal){
                    lincProgress[studentID] = true
                    lincComplete++
                } else {
                    lincProgress[studentID] = false
                    lincIncomplete++
                }
            }

            if(sessionGoalID === studentID && level === '1'){
                let appGoal = sessionGoal[progressAppAndSubjectKey]
                if(appProgress >= appGoal){
                    l1Progress[studentID] = true
                    l1Complete++
                } else {
                    l1Progress[studentID] = false
                    l1Incomplete++
                }
            }

            if(sessionGoalID === studentID && level === '2'){
                let appGoal = sessionGoal[progressAppAndSubjectKey]
                if(appProgress >= appGoal){
                    l2Progress[studentID] = true
                    l2Complete++
                } else {
                    l2Progress[studentID] = false
                    l2Incomplete++
                }
            }

            if(sessionGoalID === studentID && level === '3'){
                let appGoal = sessionGoal[progressAppAndSubjectKey]
                if(appProgress >= appGoal){
                    l3Progress[studentID] = true
                    l3Complete++
                } else {
                    l3Progress[studentID] = false
                    l3Incomplete++
                }
            }
        })

        //console.log(currentProgress)
        //console.log(studentID)
        
    })
    .on('end', rowCount => {
       //console.log(lLProgress)
       console.log('LL - Completed session goals:', lLComplete)
       console.log('LL - Did not complete session goals:', lLIncomplete)
       console.log(100*(lLComplete/(lLComplete+lLIncomplete)), '% completed session goals in LL')

       //console.log(lincProgress)
       console.log('Linc - Completed session goals:', lincComplete)
       console.log('Linc - Did not complete session goals:', lincIncomplete)
       console.log(100*(lincComplete/(lincComplete+lincIncomplete)), '% completed session goals in Linc')

       //console.log(l1Progress)
       console.log('L1 - Completed session goals:', l1Complete)
       console.log('L1 - Did not complete session goals:', l1Incomplete)
       console.log(100*(l1Complete/(l1Complete+l1Incomplete)), '% completed session goals in L1')

       //console.log(l2Progress)
       console.log('L2 - Completed session goals:', l2Complete)
       console.log('L2 - Did not complete session goals:', l2Incomplete)
       console.log(100*(l2Complete/(l2Complete+l2Incomplete)), '% completed session goals in L2')

       //console.log(l3Progress)
       console.log('L3 - Completed session goals:', l3Complete)
       console.log('L3 - Did not complete session goals:', l3Incomplete)
       console.log(100*(l3Complete/(l3Complete+l3Incomplete)), '% completed session goals in L3')
    });

