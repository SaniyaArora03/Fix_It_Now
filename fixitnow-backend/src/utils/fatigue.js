export function canTakeJob(technician,urgency){
    if(technician.fatigueScore>=90){
        return urgency==="emergency";
    }
    return true;
    }
export function increaseFatigue(technician, urgency){
    let increment=10;
    if(urgency==="emergency")increment+=15;
    if(technician.jobsToday>5)increment+=20;
    technician.fatigueScore+=increment;
}  
