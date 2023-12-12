import React, { useState } from 'react';
import { SERVER_URL } from '../constants';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogTitle';

function EditAssignment(props) {
    const [assignmentName, setAssignmentName] = useState(props.assignment.assignmentName);
    const [courseTitle, setCourseTitle] = useState(props.assignment.courseTitle);
    const [dueDate, setDueDate] = useState(props.assignment.dueDate);
    const [courseId, setCourseId] = useState(props.assignment.courseId)
    const [id, setId] = useState(props.assignment.id)
    const [open, setOpen] = useState(false);

    const handleEditAssignment = () => {
        const editedAssignment = { assignmentName, courseTitle, dueDate, courseId, id };

        fetch(`${SERVER_URL}/assignment/${props.assignment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedAssignment),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle success or display an error message
                console.log(data);
                props.fetchAssignments(); // Call the parent component's function to refresh the assignment list
            })
            .catch((error) => {
                console.error(error);
                // Handle error here
            });
        handleClose()
    };

    const handleOpen = () => {
        setOpen(true);
    }


    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            {/* Edit Assignment Form */}
            {/*{props.isEditDialogOpen && (*/}
            {/*    <div>*/}
                    <button id="editassignment" onClick={handleOpen}>Edit</button>
                    <Dialog open={open}>
                        <DialogContent>
                    <h3>Edit Assignment</h3>
                    <input
                        type="text"
                        placeholder="Assignment Name"
                        id="assignmentname1"
                        value={assignmentName}
                        onChange={(e) => setAssignmentName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Course Title"
                        id="coursename1"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Due Date"
                        id="assignmentdue1"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                            <DialogActions>
                    <button id="updatebutton" onClick={handleEditAssignment}>Save</button>
                    <button onClick={handleClose}>Cancel</button>
                        </DialogActions>
                    </DialogContent>
        </Dialog>
                {/*</div>*/}
            {/*)}*/}
        </div>
    );
}

export default EditAssignment;
