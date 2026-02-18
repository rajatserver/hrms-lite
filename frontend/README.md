# HRMS Lite Frontend

This is the frontend for the HRMS Lite application, built with React and Vite, styled using Tailwind CSS.

## Features
- Employee management (add, list)
- Attendance tracking (add, list)
- Error handling and loading spinners
- Modern UI with Tailwind CSS

## Project Structure
```
frontend/
├── index.html
├── package.json
├── postcss.config.cjs
├── tailwind.config.js
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── api/
│   │   └── client.js
│   └── components/
│       ├── AttendanceForm.jsx
│       ├── AttendanceList.jsx
│       ├── EmployeeForm.jsx
│       ├── EmployeeList.jsx
│       ├── ErrorBanner.jsx
│       └── Spinner.jsx
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm

### Installation
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Development Server
```sh
npm run dev
```
The app will be available at `http://localhost:5173` by default.

### Building for Production
```sh
npm run build
```

### Linting
```sh
npm run lint
```

## Environment Variables
Create a `.env` file in the `frontend` directory to configure environment variables (e.g., API endpoints).

## Technologies Used
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## License
This project is licensed under the MIT License.
