// src/App.jsx
// Root application component. Renders the hero header, the Add Employee form,
// and the Data Table. Both components read/write via the shared Redux store.

import AddEntryForm from './components/AddEntryForm/AddEntryForm';
import DataTable from './components/DataTable/DataTable';
import './App.css';

export default function App() {
    return (
        <div className="app">
            {/* ── Hero Header ── */}
            <header className="app-header">
                <div className="header-badge">React + Redux Toolkit</div>
                <h1 className="app-title">Employee Data Manager</h1>
                <p className="app-subtitle">
                    Manage, filter, sort, and export your employee records with a modern,
                    fully responsive interface.
                </p>
            </header>

            <main>
                {/* ── Add Employee Form ── */}
                <div className="section-label">
                    <span>📝</span> Add New Record
                </div>
                <AddEntryForm />

                <div className="divider" aria-hidden="true" />

                {/* ── Data Table ── */}
                <div className="section-label">
                    <span>📊</span> Employee Records
                </div>
                <DataTable />
            </main>

            {/* ── Footer ── */}
            <footer className="app-footer">
                <p>
                    Built with{' '}
                    <a href="https://react.dev" target="_blank" rel="noreferrer">React</a>,{' '}
                    <a href="https://redux-toolkit.js.org" target="_blank" rel="noreferrer">Redux Toolkit</a>,{' '}
                    <a href="https://tanstack.com/table" target="_blank" rel="noreferrer">TanStack Table</a>,{' and '}
                    <a href="https://react-hook-form.com" target="_blank" rel="noreferrer">React Hook Form</a>.
                </p>
            </footer>
        </div>
    );
}
