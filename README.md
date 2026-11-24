# Staffer

An employee directory with a REST API and a web client.

Staffer browses and edits the classic MySQL *employees* sample database. The Java backend exposes employees, salaries, titles and departments, and the Next.js frontend lets you explore departments, search employees and edit an employee record.

## Table of contents

- [Staffer](#staffer)
	- [Table of contents](#table-of-contents)
	- [How it works](#how-it-works)
	- [Tech stack](#tech-stack)
	- [Repository structure](#repository-structure)
	- [Prerequisites](#prerequisites)
	- [Installation](#installation)
	- [Configuration](#configuration)
		- [Backend (`backend/src/main/resources/application.properties`)](#backend-backendsrcmainresourcesapplicationproperties)
		- [Frontend (`frontend/.env`)](#frontend-frontendenv)
	- [Running locally](#running-locally)
	- [Useful scripts](#useful-scripts)
	- [API](#api)
	- [Tests and quality](#tests-and-quality)
	- [License](#license)

## How it works

1. **Data**: the backend connects to a MySQL database named `employees` (employees, departments, department assignments, managers, salaries, titles).
2. **API**: Spring Boot exposes the resources under `/v1.0`. Salaries, titles and department assignments are nested under their employee or department, and each has a `/last` route for the current value. Lists are paginated.
3. **Departments page**: pick a department from a list sorted by `{dept_no} - {dept_name}` to see its current manager and its current employees.
4. **Search page**: a text query is matched against employee number, first name and last name, and the results are paginated.
5. **Employee page**: shows the employee form (identity, department, dates, current title and salary) and a salary chart, with `Create`, `Update` and `Delete` actions. Selecting a row on the other pages opens the employee with the form pre-filled.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS, Radix UI (shadcn/ui), TanStack Query, Zustand, React Hook Form, Zod, Recharts, `nuqs` |
| Backend | Java 17, Spring Boot 3.2, Spring Data JPA, Bean Validation, Lombok, springdoc-openapi |
| Data | MySQL 8 |
| Tooling | Maven (wrapper included), pnpm, ESLint, Vitest |

## Repository structure

```
.
├── annexes/     OpenAPI file and original brief
├── backend/     Spring Boot API
├── database/    SQL schema and data (MySQL and PostgreSQL schemas)
├── frontend/    Next.js application
└── pom.xml      Parent Maven project
```

The backend code is in `backend/src/main/java/fr/eseo/apiserver`, split into `controller`, `service`, `repository`, `model`, `validator` and `config`. The frontend follows an atomic layout under `frontend/src/lib/components` (`atoms`, `molecules`, `organisms`), with API calls in `frontend/src/lib/actions`. Files are named `<name>.<kind>.ts` and each folder exposes an `index.ts`.

## Prerequisites

- [Java](https://adoptium.net/) 17 or later
- [Node.js](https://nodejs.org/) 18 or later
- [pnpm](https://pnpm.io/) 8 or later
- A [MySQL](https://www.mysql.com/) 8 server

## Installation

```bash
git clone git@github.com:maxencebonamy/staffer.git
cd staffer
```

Create the schema and load the data. The scripts must run in this order, and the dataset is large (about 180 MB).

```bash
mysql -u root -e "CREATE DATABASE employees"
mysql -u root employees < database/init-mysql.sql
mysql -u root employees < database/1-populate-departments.sql
mysql -u root employees < database/2-populate-employees.sql
mysql -u root employees < database/3-populate-dept_emp.sql
mysql -u root employees < database/4-populate-dept_manager.sql
mysql -u root employees < database/5-populate-salaries-1.sql
mysql -u root employees < database/5-populate-salaries-2.sql
mysql -u root employees < database/5-populate-salaries-3.sql
mysql -u root employees < database/5-populate-salaries-4.sql
mysql -u root employees < database/5-populate-salaries-5.sql
mysql -u root employees < database/6-populate-titles.sql
```

Install the frontend dependencies:

```bash
cd frontend
pnpm install
```

## Configuration

### Backend (`backend/src/main/resources/application.properties`)

The backend has no `.env` file. Edit the properties directly.

| Variable | Description | Example |
| --- | --- | --- |
| `spring.datasource.url` | JDBC URL of the database | `jdbc:mysql://localhost:3306/employees` |
| `spring.datasource.username` | Database user | `root` |
| `spring.datasource.password` | Database password | |
| `server.port` | Listening port | `8080` |

### Frontend (`frontend/.env`)

```bash
cp frontend/.env.example frontend/.env
```

| Variable | Description | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_STAFFER_API` | Base URL of the backend API | `http://localhost:8080/v1.0` |

## Running locally

Start the backend and the frontend in two terminals.

```bash
cd backend
./mvnw spring-boot:run
```

```bash
cd frontend
pnpm dev
```

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:8080>
- Swagger UI: <http://localhost:8080/v1.0/swagger>
- OpenAPI JSON: <http://localhost:8080/v1.0/api-docs>

## Useful scripts

Run from `frontend/`.

| Command | Effect |
| --- | --- |
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Build the production bundle |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Lint the code |
| `pnpm lint:fix` | Lint and auto-fix |
| `pnpm test` | Run Vitest |
| `pnpm coverage` | Run Vitest with coverage |
| `pnpm create:page` | Generate a page from the template |
| `pnpm create:layout` | Generate a layout from the template |
| `pnpm create:component` | Generate a component from the template |
| `pnpm create:store` | Generate a Zustand store from the template |
| `pnpm create:util` | Generate a utility module from the template |

## API

The OpenAPI description is versioned in [`annexes/api-docs.yaml`](annexes/api-docs.yaml). List routes accept the Spring `page`, `size` and `sort` query parameters. `GET /v1.0/employees` also accepts `search`.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/v1.0/employees` | List or search employees |
| `POST` | `/v1.0/employees` | Create an employee |
| `GET` | `/v1.0/employees/{id}` | Get an employee |
| `PUT` | `/v1.0/employees/{id}` | Replace an employee |
| `PATCH` | `/v1.0/employees/{id}` | Partially update an employee |
| `DELETE` | `/v1.0/employees/{id}` | Delete an employee |
| `GET` | `/v1.0/employees/{id}/departments` | Department assignments of an employee |
| `GET` | `/v1.0/employees/{id}/departments/last` | Current department of an employee |
| `GET` | `/v1.0/employees/{id}/salaries` | Salaries of an employee |
| `GET` | `/v1.0/employees/{id}/salaries/last` | Current salary |
| `GET` | `/v1.0/employees/{id}/salaries/{fromDate}` | Salary starting on a date |
| `POST` | `/v1.0/employees/{id}/salaries` | Create a salary |
| `GET` | `/v1.0/employees/{id}/titles` | Titles of an employee |
| `GET` | `/v1.0/employees/{id}/titles/last` | Current title |
| `GET` | `/v1.0/employees/{id}/titles/{fromDate}` | Title starting on a date |
| `POST` | `/v1.0/employees/{id}/titles` | Create a title |
| `GET` | `/v1.0/departments` | List departments |
| `POST` | `/v1.0/departments` | Create a department |
| `GET` | `/v1.0/departments/{id}` | Get a department |
| `PUT` | `/v1.0/departments/{id}` | Replace a department |
| `PATCH` | `/v1.0/departments/{id}` | Partially update a department |
| `DELETE` | `/v1.0/departments/{id}` | Delete a department |
| `GET` | `/v1.0/departments/{id}/managers` | Managers of a department |
| `GET` | `/v1.0/departments/{id}/managers/last` | Current manager |
| `GET` | `/v1.0/departments/{id}/employees` | Employees of a department |
| `GET` | `/v1.0/departments/{id}/employees/last` | Current employees of a department |
| `POST` | `/v1.0/departments/{id}/employees` | Assign an employee to a department |

## Tests and quality

```bash
cd backend
./mvnw test
```

```bash
cd frontend
pnpm lint
pnpm test
```

The backend has a single Spring context test and it needs the MySQL database to be running. The frontend has no test files yet; Vitest is configured to pick up `src/**/*.test.ts`.

## License

This project is licensed under the [MIT License](LICENSE).
