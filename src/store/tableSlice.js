// src/store/tableSlice.js
// Redux slice managing the employee table data
import { createSlice } from '@reduxjs/toolkit';

// Departments and roles for dummy data generation
const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design', 'Operations', 'Legal'];
const roles = {
    Engineering: ['Frontend Dev', 'Backend Dev', 'DevOps Engineer', 'QA Engineer', 'Tech Lead'],
    Marketing: ['SEO Specialist', 'Content Writer', 'Brand Manager', 'Growth Hacker', 'Marketing Lead'],
    Sales: ['Sales Executive', 'Account Manager', 'Sales Manager', 'BDR', 'Sales Director'],
    HR: ['HR Executive', 'Recruiter', 'HR Manager', 'Payroll Specialist', 'L&D Specialist'],
    Finance: ['Accountant', 'Financial Analyst', 'CFO', 'Auditor', 'Tax Consultant'],
    Design: ['UI Designer', 'UX Designer', 'Graphic Designer', 'Product Designer', 'Design Lead'],
    Operations: ['Operations Manager', 'Project Manager', 'Business Analyst', 'Scrum Master', 'COO'],
    Legal: ['Legal Counsel', 'Compliance Officer', 'Contract Manager', 'Paralegal', 'Legal Director'],
};
const statuses = ['Active', 'Inactive', 'On Leave', 'Probation'];

const firstNames = ['Aarav', 'Priya', 'Rohan', 'Sneha', 'Vikram', 'Ananya', 'Arjun', 'Kavya',
    'Rahul', 'Pooja', 'Siddharth', 'Meera', 'Karan', 'Divya', 'Nikhil', 'Riya',
    'Aditya', 'Shreya', 'Varun', 'Nisha', 'Harish', 'Lakshmi', 'Suresh', 'Deepa',
    'Manish', 'Swati', 'Tarun', 'Rekha', 'Vijay', 'Sunita', 'Amit', 'Geeta',
    'Rajesh', 'Seema', 'Ashish', 'Preeti', 'Manoj', 'Alka', 'Vivek', 'Shilpa',
    'Dinesh', 'Usha', 'Ramesh', 'Asha', 'Mahesh', 'Lata', 'Ganesh', 'Radha',
    'Pavan', 'Navya'];

const lastNames = ['Sharma', 'Patel', 'Mehta', 'Gupta', 'Singh', 'Kumar', 'Shah', 'Joshi',
    'Agarwal', 'Rao', 'Reddy', 'Nair', 'Menon', 'Pillai', 'Iyer', 'Chaudhary',
    'Malhotra', 'Chopra', 'Bose', 'Das', 'Verma', 'Saxena', 'Tiwari', 'Pandey',
    'Bhatt', 'Jain', 'Kapoor', 'Srivastava', 'Mishra', 'Dubey', 'Tripathi', 'Yadav',
    'Chauhan', 'Solanki', 'Rathod', 'Desai', 'Parekh', 'Thakkar', 'Modi', 'Gandhi',
    'Dixit', 'Shukla', 'Awasthi', 'Sinha', 'Banerjee', 'Chatterjee', 'Ghosh', 'Mukherjee',
    'Bhat', 'Kulkarni'];

/**
 * Generates a random date string between 2018 and 2024
 */
function randomDate() {
    const year = 2018 + Math.floor(Math.random() * 6);
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Generates an array of 50 dummy employee records
 */
function generateDummyData() {
    return Array.from({ length: 50 }, (_, i) => {
        const firstName = firstNames[i % firstNames.length];
        const lastName = lastNames[i % lastNames.length];
        const dept = departments[i % departments.length];
        const roleList = roles[dept];
        return {
            id: i + 1,
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
            department: dept,
            role: roleList[i % roleList.length],
            salary: Math.floor(Math.random() * 80000 + 40000),
            status: statuses[i % statuses.length],
            joinDate: randomDate(),
        };
    });
}

const initialState = {
    // The full dataset (persisted source of truth)
    data: generateDummyData(),
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        /**
         * Adds a new employee entry to the beginning of the dataset.
         * The Redux Toolkit uses Immer under the hood so direct mutation is safe here.
         */
        addEntry(state, action) {
            const newEntry = {
                ...action.payload,
                id: state.data.length + 1,
                salary: Number(action.payload.salary),
            };
            state.data.unshift(newEntry);
        },
    },
});

export const { addEntry } = tableSlice.actions;
export default tableSlice.reducer;
