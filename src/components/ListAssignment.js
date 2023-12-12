import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import { Link } from 'react-router-dom';
import AddAssignment from './AddAssignment';
import EditAssignment from './EditAssignment';

function ListAssignment(props) {
    const [assignments, setAssignments] = useState([]);
    const [message, setMessage] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = () => {
        fetch(`${SERVER_URL}/assignment`)
            .then((response) => response.json())
            .then((data) => {
                setAssignments(data);
            })
            .catch((err) => console.error(err));
    };

    // Function to toggle the add dialog
    const toggleAddDialog = () => {
        setIsAddDialogOpen(!isAddDialogOpen);
    };

    // Function to toggle the edit dialog and set the selected assignment
    const toggleEditDialog = (assignment) => {
        setIsEditDialogOpen(!isEditDialogOpen);
        setSelectedAssignment(assignment);
    };

    const deleteAssignment = (assignmentId) => {
        fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setMessage('Assignment deleted successfully.');
                    fetchAssignments(); // Refresh the assignment list after deletion
                } else {
                    setMessage(' ');
                }
            })
            .catch((error) => {
                console.error(error);
                setMessage(' ');
            });
    };

    const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];

    return (
        <div>
            <h3>Assignments</h3>
            <AddAssignment
                fetchAssignments={fetchAssignments}
                isAddDialogOpen={isAddDialogOpen}
                toggleAddDialog={toggleAddDialog}
            />
            <div margin="auto">
                <h4>{message}&nbsp;</h4>
                <table className="Center">
                    <thead>
                    <tr>
                        {headers.map((title, idx) => (
                            <th key={idx}>{title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {assignments.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.assignmentName}</td>
                            <td>{row.courseTitle}</td>
                            <td>{row.dueDate}</td>
                            <td>
                                <Link to={`/gradeAssignment/${assignments[idx].id}`}>Grade</Link>
                            </td>
                            <td>
                                {/*<button onClick={() => toggleEditDialog(row)}>Edit</button>*/}
                                <EditAssignment
                                    assignment={row}
                                    // isEditDialogOpen={isEditDialogOpen}
                                    // toggleEditDialog={toggleEditDialog}
                                    fetchAssignments={fetchAssignments}
                                />
                            </td>
                            <td><button id="deletebutton" onClick={() => deleteAssignment(row.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {/*{isEditDialogOpen && (*/}
            {/*    <EditAssignment*/}
            {/*        assignment={selectedAssignment}*/}
            {/*        isEditDialogOpen={isEditDialogOpen}*/}
            {/*        toggleEditDialog={toggleEditDialog}*/}
            {/*        fetchAssignments={fetchAssignments}*/}
            {/*    />*/}
            {/*)}*/}
        </div>
    );
}

export default ListAssignment;
