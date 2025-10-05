document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const addEmployeeForm = document.getElementById('addEmployeeForm');
    const employeeTableBody = document.querySelector('#employeeTable tbody');
    const noEmployeesMessage = document.getElementById('no-employees-message');
    
    // --- Tab Switching Logic ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and content
            tabs.forEach(item => item.classList.remove('active'));
            tabContents.forEach(item => item.classList.remove('active'));

            // Add active class to clicked tab and its content
            tab.classList.add('active');
            const targetTabContent = document.getElementById(tab.dataset.tab);
            if(targetTabContent) {
                targetTabContent.classList.add('active');
            }
        });
    });

    // --- Form Submission Logic ---
    addEmployeeForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission

        // Get values from the form
        const fullName = document.getElementById('fullName').value.trim();
        const department = document.getElementById('department').value;
        const annualSalary = document.getElementById('annualSalary').value;

        // Basic validation
        if (!fullName || !department || !annualSalary) {
            alert('Please fill out all fields.');
            return;
        }

        // Add employee to the table
        addEmployeeToTable(fullName, department, annualSalary);

        // Clear the form
        addEmployeeForm.reset();

        // Optionally, switch to the employee list tab
        document.querySelector('.tab-link[data-tab="employee-list-tab"]').click();
    });

    function addEmployeeToTable(name, dept, salary) {
        // Hide the 'no employees' message if it's visible
        if (noEmployeesMessage) {
            noEmployeesMessage.style.display = 'none';
        }

        const newRow = employeeTableBody.insertRow();

        const nameCell = newRow.insertCell(0);
        const deptCell = newRow.insertCell(1);
        const salaryCell = newRow.insertCell(2);

        nameCell.textContent = name;
        deptCell.textContent = dept;
        // Format salary with commas
        salaryCell.textContent = parseFloat(salary).toLocaleString('en-US');
    }
});