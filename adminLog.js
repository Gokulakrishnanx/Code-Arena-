// Admin Log System
class AdminLog {
    constructor() {
        this.logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
    }

    // Add a new log entry
    addLog(action, details) {
        const logEntry = {
            timestamp: new Date().toLocaleString(),
            action: action,
            details: details
        };

        this.logs.unshift(logEntry); // Add to beginning of array
        this.saveLogs();
        this.updateLogDisplay();
    }

    // Save logs to localStorage
    saveLogs() {
        localStorage.setItem('adminLogs', JSON.stringify(this.logs));
    }

    // Update the log display in the UI
    updateLogDisplay() {
        const logContainer = document.getElementById('adminLogContainer');
        if (!logContainer) return;

        logContainer.innerHTML = this.logs.map(log => `
            <div class="log-entry">
                <div class="log-timestamp">${log.timestamp}</div>
                <div class="log-action">${log.action}</div>
                <div class="log-details">${log.details}</div>
            </div>
        `).join('');
    }

    // Clear all logs
    clearLogs() {
        this.logs = [];
        this.saveLogs();
        this.updateLogDisplay();
    }
}

// Create global adminLog instance
const adminLog = new AdminLog();

// Export for use in other files
window.adminLog = adminLog; 