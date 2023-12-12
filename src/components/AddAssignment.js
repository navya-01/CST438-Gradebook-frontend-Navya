import React, { useState } from 'react';
import { SERVER_URL } from '../constants';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogTitle';

function AddAssignment(props) {
    const [assignmentName, setAssignmentName] = useState('');
    const [courseTitle, setCourseTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [courseId, setCourseId] = useState('')
    const [open, setOpen] = useState(false);


    const handleAddAssignment = () => {
        const newAssignment = { assignmentName, courseTitle, dueDate, courseId };

        fetch(`${SERVER_URL}/assignment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAssignment),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                props.fetchAssignments();
            })
            .catch((error) => {
                console.error(error);
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
            <button id="addbutton" onClick={handleOpen}>Add Assignment</button>
            <Dialog open={open}>
            <DialogContent>
                    <h3>Add New Assignment</h3>
                    <input
                        type="text"
                        placeholder="Assignment Name"
                        id="assignmentname"
                        value={assignmentName}
                        onChange={(e) => setAssignmentName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Course Title"
                        id="coursename"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Course Id"
                        id="courseID"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Due Date"
                        id="assignmentdue"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                <DialogActions>
                    <button id="saveassignment" onClick={handleAddAssignment}>Save</button>
                    <button onClick={handleClose}>Cancel</button>
                </DialogActions>
          </DialogContent>
        </Dialog>
        </div>
    );
}

export default AddAssignment;
