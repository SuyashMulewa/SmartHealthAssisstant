// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Load saved checklist items
    loadChecklistItems();
    
    // Load saved medicine reminders
    loadMedicineReminders();
    
    // Start checking medicine reminders
    checkMedicineReminders();
});

// BMI Calculator
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const resultDiv = document.getElementById('bmi-result');

    if (!height || !weight || height <= 0 || weight <= 0) {
        resultDiv.innerHTML = '<p style="color: #d32f2f;">Please enter valid height and weight values.</p>';
        return;
    }

    // Convert height from cm to meters
    const heightInMeters = height / 100;
    
    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = bmi.toFixed(1);

    let category, colorClass, message;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        colorClass = 'underweight';
        message = 'Consider consulting with a healthcare provider about maintaining a healthy weight.';
    } else if (bmi < 25) {
        category = 'Normal';
        colorClass = 'normal';
        message = 'Great! You\'re in a healthy weight range. Keep maintaining a balanced diet and regular exercise.';
    } else if (bmi < 30) {
        category = 'Overweight';
        colorClass = 'overweight';
        message = 'Consider increasing physical activity and consulting with a healthcare provider for guidance.';
    } else {
        category = 'Obese';
        colorClass = 'obese';
        message = 'Please consult with a healthcare provider for guidance on achieving a healthy weight.';
    }

    resultDiv.className = `bmi-result ${colorClass}`;
    resultDiv.innerHTML = `
        <h3>Your BMI: ${bmiRounded}</h3>
        <p>Category: ${category}</p>
        <p style="margin-top: 10px; font-size: 0.9em;">${message}</p>
    `;
}

// Symptom-to-Specialist Guide
async function checkSymptom() {
    const symptomInput = document.getElementById('symptom-input').value.trim();
    const resultDiv = document.getElementById('symptom-result');

    if (!symptomInput) {
        resultDiv.innerHTML = '<p style="color: #d32f2f;">Please enter at least one symptom.</p>';
        return;
    }

    const symptoms = symptomInput.split(',').map(s => s.trim()).filter(s => s.length > 0);

    resultDiv.innerHTML = '<p>Searching for specialists...</p>';

    try {
        const response = await fetch('/api/symptom-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symptoms: symptoms })
        });

        const data = await response.json();

        if (data.success && data.recommendations.length > 0) {
            let html = '';
            data.recommendations.forEach(rec => {
                const urgencyClass = rec.urgency === 'high' ? 'urgency-high' : '';
                html += `
                    <div class="recommendation-card ${urgencyClass}">
                        <h3>${rec.symptom} → ${rec.specialist}</h3>
                        <p><strong>Specialist:</strong> ${rec.specialist}</p>
                        <p>${rec.description}</p>
                        ${rec.urgency === 'high' ? '<p style="color: #d32f2f; font-weight: 600;">⚠️ This may require urgent attention.</p>' : ''}
                    </div>
                `;
            });
            resultDiv.innerHTML = html;
        } else {
            resultDiv.innerHTML = '<p>No recommendations found. Please try different symptoms or consult a general practitioner.</p>';
        }
    } catch (error) {
        resultDiv.innerHTML = '<p style="color: #d32f2f;">Error: Could not connect to server. Please try again later.</p>';
        console.error('Error:', error);
    }
}

// Daily Health Checklist
function addChecklistItem() {
    const input = document.getElementById('checklist-input');
    const itemText = input.value.trim();

    if (!itemText) {
        return;
    }

    // Get existing items from localStorage
    const items = getChecklistItems();
    items.push({ text: itemText, completed: false });
    saveChecklistItems(items);

    input.value = '';
    loadChecklistItems();
}

function getChecklistItems() {
    const stored = localStorage.getItem('healthChecklist');
    return stored ? JSON.parse(stored) : [];
}

function saveChecklistItems(items) {
    localStorage.setItem('healthChecklist', JSON.stringify(items));
}

function loadChecklistItems() {
    const items = getChecklistItems();
    const listContainer = document.getElementById('checklist-items');

    if (items.length === 0) {
        listContainer.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No checklist items yet. Add your first health habit!</p>';
        return;
    }

    listContainer.innerHTML = items.map((item, index) => `
        <li class="checklist-item ${item.completed ? 'completed' : ''}">
            <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleChecklistItem(${index})">
            <label onclick="toggleChecklistItem(${index})">${item.text}</label>
            <button class="delete-btn" onclick="deleteChecklistItem(${index})">Delete</button>
        </li>
    `).join('');
}

function toggleChecklistItem(index) {
    const items = getChecklistItems();
    items[index].completed = !items[index].completed;
    saveChecklistItems(items);
    loadChecklistItems();
}

function deleteChecklistItem(index) {
    const items = getChecklistItems();
    items.splice(index, 1);
    saveChecklistItems(items);
    loadChecklistItems();
}

// Medicine Reminder System
function setMedicineReminder() {
    const name = document.getElementById('medicine-name').value.trim();
    const time = document.getElementById('medicine-time').value;

    if (!name || !time) {
        alert('Please enter both medicine name and time.');
        return;
    }

    const reminders = getMedicineReminders();
    reminders.push({ name: name, time: time });
    saveMedicineReminders(reminders);

    document.getElementById('medicine-name').value = '';
    document.getElementById('medicine-time').value = '';
    
    loadMedicineReminders();
    alert(`Reminder set for ${name} at ${time}`);
}

function getMedicineReminders() {
    const stored = localStorage.getItem('medicineReminders');
    return stored ? JSON.parse(stored) : [];
}

function saveMedicineReminders(reminders) {
    localStorage.setItem('medicineReminders', JSON.stringify(reminders));
}

function loadMedicineReminders() {
    const reminders = getMedicineReminders();
    const listContainer = document.getElementById('medicine-list');

    if (reminders.length === 0) {
        listContainer.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No medicine reminders set. Add your first reminder!</p>';
        return;
    }

    listContainer.innerHTML = reminders.map((reminder, index) => `
        <div class="medicine-item">
            <div class="medicine-item-info">
                <div class="medicine-item-name">${reminder.name}</div>
                <div class="medicine-item-time">⏰ ${reminder.time}</div>
            </div>
            <button class="delete-medicine-btn" onclick="deleteMedicineReminder(${index})">Delete</button>
        </div>
    `).join('');
}

function deleteMedicineReminder(index) {
    const reminders = getMedicineReminders();
    reminders.splice(index, 1);
    saveMedicineReminders(reminders);
    loadMedicineReminders();
}

function checkMedicineReminders() {
    setInterval(() => {
        const reminders = getMedicineReminders();
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        reminders.forEach(reminder => {
            if (reminder.time === currentTime) {
                alert(`⏰ Medicine Reminder: It's time to take ${reminder.name}!`);
            }
        });
    }, 60000); // Check every minute
}

// First Aid Quick Search
let firstAidDebounceTimer;
async function searchFirstAid() {
    clearTimeout(firstAidDebounceTimer);
    firstAidDebounceTimer = setTimeout(async () => {
        const query = document.getElementById('firstaid-search').value.trim();
        const resultDiv = document.getElementById('firstaid-result');

        if (!query) {
            resultDiv.innerHTML = '';
            return;
        }

        try {
            const response = await fetch(`/api/first-aid?q=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (data.success && data.results.length > 0) {
                let html = '';
                data.results.forEach(result => {
                    html += `
                        <div class="firstaid-card">
                            <h3>${result.topic}</h3>
                            <ol class="firstaid-steps">
                                ${result.steps.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                            ${result.warning ? `<div class="firstaid-warning">⚠️ ${result.warning}</div>` : ''}
                        </div>
                    `;
                });
                resultDiv.innerHTML = html;
            } else {
                resultDiv.innerHTML = '<p style="color: #999;">No first aid instructions found. Try searching for: Burn, Choking, Cut, Faint, Nosebleed, Sprain, etc.</p>';
            }
        } catch (error) {
            resultDiv.innerHTML = '<p style="color: #d32f2f;">Error: Could not connect to server. Please try again later.</p>';
            console.error('Error:', error);
        }
    }, 300); // Debounce for 300ms
}
