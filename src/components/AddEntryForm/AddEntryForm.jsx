// src/components/AddEntryForm/AddEntryForm.jsx
// A form using React Hook Form to add new employee entries to the Redux store.
// All fields match the table columns and have strict validation rules.

import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addEntry } from '../../store/tableSlice';
import './AddEntryForm.css';

const DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design', 'Operations', 'Legal'];
const ROLES = ['Frontend Dev', 'Backend Dev', 'DevOps Engineer', 'QA Engineer', 'Tech Lead',
    'SEO Specialist', 'Content Writer', 'Brand Manager', 'Growth Hacker', 'Marketing Lead',
    'Sales Executive', 'Account Manager', 'Sales Manager', 'BDR', 'Sales Director',
    'HR Executive', 'Recruiter', 'HR Manager', 'Payroll Specialist', 'L&D Specialist',
    'Accountant', 'Financial Analyst', 'CFO', 'Auditor', 'Tax Consultant',
    'UI Designer', 'UX Designer', 'Graphic Designer', 'Product Designer', 'Design Lead',
    'Operations Manager', 'Project Manager', 'Business Analyst', 'Scrum Master', 'COO',
    'Legal Counsel', 'Compliance Officer', 'Contract Manager', 'Paralegal', 'Legal Director'];
const STATUSES = ['Active', 'Inactive', 'On Leave', 'Probation'];

export default function AddEntryForm() {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm({ mode: 'onTouched' }); // Validate on blur, then live update after first attempt

    /**
     * Called on valid form submission — dispatches addEntry action to Redux and resets form.
     */
    const onSubmit = (data) => {
        dispatch(addEntry(data));
        reset();
    };

    return (
        <section className="form-section" aria-label="Add New Employee Form">
            <h2 className="form-title">
                <span className="form-icon" aria-hidden="true">➕</span>
                Add New Employee
            </h2>
            {isSubmitSuccessful && (
                <div className="success-banner" role="status" aria-live="polite">
                    ✅ Employee added successfully! The table has been updated.
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="entry-form">
                <div className="form-grid">

                    {/* ── Name ── */}
                    <div className="form-group">
                        <label htmlFor="name">Full Name <span className="required">*</span></label>
                        <input
                            id="name"
                            type="text"
                            placeholder="e.g. Priya Sharma"
                            className={errors.name ? 'input-error' : ''}
                            {...register('name', {
                                required: 'Full name is required.',
                                minLength: { value: 3, message: 'Name must be at least 3 characters.' },
                                maxLength: { value: 60, message: 'Name must be at most 60 characters.' },
                                pattern: { value: /^[a-zA-Z\s'-]+$/, message: 'Name may only contain letters, spaces, hyphens, or apostrophes.' },
                            })}
                        />
                        {errors.name && <p className="error-msg" role="alert">{errors.name.message}</p>}
                    </div>

                    {/* ── Email ── */}
                    <div className="form-group">
                        <label htmlFor="email">Email Address <span className="required">*</span></label>
                        <input
                            id="email"
                            type="email"
                            placeholder="e.g. priya.sharma@company.com"
                            className={errors.email ? 'input-error' : ''}
                            {...register('email', {
                                required: 'Email address is required.',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please enter a valid email address.',
                                },
                            })}
                        />
                        {errors.email && <p className="error-msg" role="alert">{errors.email.message}</p>}
                    </div>

                    {/* ── Department ── */}
                    <div className="form-group">
                        <label htmlFor="department">Department <span className="required">*</span></label>
                        <select
                            id="department"
                            className={errors.department ? 'input-error' : ''}
                            {...register('department', { required: 'Please select a department.' })}
                        >
                            <option value="">— Select Department —</option>
                            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                        {errors.department && <p className="error-msg" role="alert">{errors.department.message}</p>}
                    </div>

                    {/* ── Role ── */}
                    <div className="form-group">
                        <label htmlFor="role">Role <span className="required">*</span></label>
                        <select
                            id="role"
                            className={errors.role ? 'input-error' : ''}
                            {...register('role', { required: 'Please select a role.' })}
                        >
                            <option value="">— Select Role —</option>
                            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                        {errors.role && <p className="error-msg" role="alert">{errors.role.message}</p>}
                    </div>

                    {/* ── Salary ── */}
                    <div className="form-group">
                        <label htmlFor="salary">Salary (₹) <span className="required">*</span></label>
                        <input
                            id="salary"
                            type="number"
                            placeholder="e.g. 75000"
                            className={errors.salary ? 'input-error' : ''}
                            {...register('salary', {
                                required: 'Salary is required.',
                                min: { value: 10000, message: 'Salary must be at least ₹10,000.' },
                                max: { value: 5000000, message: 'Salary cannot exceed ₹50,00,000.' },
                                valueAsNumber: true,
                            })}
                        />
                        {errors.salary && <p className="error-msg" role="alert">{errors.salary.message}</p>}
                    </div>

                    {/* ── Status ── */}
                    <div className="form-group">
                        <label htmlFor="status">Status <span className="required">*</span></label>
                        <select
                            id="status"
                            className={errors.status ? 'input-error' : ''}
                            {...register('status', { required: 'Please select a status.' })}
                        >
                            <option value="">— Select Status —</option>
                            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.status && <p className="error-msg" role="alert">{errors.status.message}</p>}
                    </div>

                    {/* ── Join Date ── */}
                    <div className="form-group">
                        <label htmlFor="joinDate">Join Date <span className="required">*</span></label>
                        <input
                            id="joinDate"
                            type="date"
                            className={errors.joinDate ? 'input-error' : ''}
                            max={new Date().toISOString().split('T')[0]} // Cannot select a future date
                            {...register('joinDate', {
                                required: 'Join date is required.',
                                validate: (val) =>
                                    new Date(val) <= new Date() || 'Join date cannot be in the future.',
                            })}
                        />
                        {errors.joinDate && <p className="error-msg" role="alert">{errors.joinDate.message}</p>}
                    </div>

                </div>{/* end .form-grid */}

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        <span>Add Employee</span>
                        <span aria-hidden="true">→</span>
                    </button>
                    <button type="button" className="reset-btn" onClick={() => reset()}>
                        Reset
                    </button>
                </div>
            </form>
        </section>
    );
}
