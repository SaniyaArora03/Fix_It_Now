export default function JobCard({job, onAccept, onReject, onStatusChange}) {
    if(!job)return  <p>No active job </p>
    return(
        <div style={{ border: "1px solid #ccc", padding: 12, marginTop: 10 }}>
            <p><b>Service:</b>{job.serviceType}</p>
            <p><b>Urgency:</b>{job.urgency}</p>
            <p><b>Status:</b>{job.status}</p>

            {job.status==="ASSIGNED"  &&(
                <>
                    <button onClick={onAccept}>Accept</button>
                    <button onClick={onReject}>Reject</button>
                </>
            )  }
            {job.status==="ACCEPTED"  &&(
                <>
                    <button onClick={()=>onStatusChange("IN_PROGRESS")}>Start Job</button>
                    
                </>
            )  }
            {job.status==="IN_PROGRESS"  &&(
                <>
                    <button onClick={()=>onStatusChange("COMPLETED")}>Complete Job</button>
                </>
            )  }
        </div>   
    );
}