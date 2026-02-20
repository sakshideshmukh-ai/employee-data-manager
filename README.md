# Employee Data Manager

A full-featured ReactJS employee data table with global filtering, column sorting, pagination, Excel export, Redux Toolkit state management, and React Hook Form validation.

## ✨ Features

- **Data Table** — 50 dummy employee records, 10/page pagination
- **Global Filter** — real-time search across all columns
- **Column Sorting** — click any column header to sort ▲ / ▼
- **Excel Export** — exports filtered data only (or all data if no filter applied)
- **Add Employee Form** — React Hook Form with 7 validated fields
- **Mobile Responsive** — table collapses to card layout on small screens
- **Redux Toolkit** — single source of truth for table data

## 🛠️ Tech Stack

| Library | Purpose |
|---|---|
| React 18 + Vite | UI + dev server |
| Redux Toolkit | Global state management |
| TanStack Table v8 | Headless table (sort, filter, paginate) |
| React Hook Form | Form + validation |
| SheetJS (xlsx) | Excel export |
| Vanilla CSS | Premium dark UI |

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## 📁 Project Structure

```
src/
├── main.jsx                  # App entry — Redux Provider
├── App.jsx                   # Root component
├── App.css                   # Global theme + layout
├── store/
│   ├── store.js              # Redux configureStore
│   └── tableSlice.js         # Dummy data (50 records) + addEntry reducer
└── components/
    ├── DataTable/
    │   ├── DataTable.jsx     # Table with sorting, filtering, pagination, export
    │   └── DataTable.css
    └── AddEntryForm/
        ├── AddEntryForm.jsx  # Form with React Hook Form + validation
        └── AddEntryForm.css
```

## 📊 Table Columns

| Column | Type | Validation |
|---|---|---|
| ID | Auto-generated | — |
| Name | Text | Required, 3-60 chars, letters only |
| Email | Email | Required, valid email pattern |
| Department | Select | Required |
| Role | Select | Required |
| Salary (₹) | Number | Required, ₹10,000–₹50,00,000 |
| Status | Select | Required |
| Join Date | Date | Required, cannot be future date |

## 📱 Mobile Support

On screens < 768px, the table transforms into a readable card layout where each row displays field names as labels above the values.

## 📥 Excel Export

- **No filter active** → downloads `employees_all.xlsx` (all 50 records)
- **Filter active** → downloads `employees_filtered.xlsx` (only matching rows)
