# PPA Model Automation

A Django web application that automates the **Premium Allocation Approach (PAA)** model for IFRS 17 insurance contract accounting. The tool streamlines actuarial workflows by replacing manual Excel-based processes with an interactive, web-based platform.

## Overview

IFRS 17 requires insurers to measure and report insurance contracts using standardised approaches. The PAA is one of the simplified measurement models permitted under the standard. This project automates the end-to-end PAA workflow — from data ingestion through to financial statement preparation — reducing manual effort and calculation errors.

## Key Features

- **Datasheet Upload** — Import policy data from Excel spreadsheets with built-in data and date validation checks.
- **Assumption Management** — Configure actuarial assumptions (discount rate, expense ratio, loss ratio, risk adjustment, acquisition costs) per class of business.
- **Session Management** — Save and resume calculation sessions, allowing users to revisit prior analyses.
- **Estimated Cashflow Projection** — Automatically project expected future cashflows based on uploaded policy data and assumptions.
- **Eligibility Testing** — Determine whether contracts qualify for PAA measurement under IFRS 17 criteria.
- **GMM Contract Analysis** — Identify contracts that require the General Measurement Model instead of PAA.
- **Contract Grouping** — Group insurance contracts by profitability and other IFRS 17 requirements.
- **Group Analysis & Summary** — Analyse and summarise grouped contract portfolios.
- **Measurement Calculations** — Perform PAA measurement computations including liability for remaining coverage and liability for incurred claims.
- **Reinsurance** — Handle reinsurance contract calculations.
- **Financial Statements** — Generate estimated financial statement outputs (Statement of Profit or Loss, Balance Sheet).
- **Disclosures & Presentations** — Produce IFRS 17 disclosure schedules and global presentation views.
- **Export to Excel** — Export results (cashflows, groupings, summaries) to Excel for further review.

## Tech Stack

| Layer      | Technology            |
|------------|-----------------------|
| Backend    | Python, Django 4      |
| Frontend   | HTML, CSS, JavaScript |
| Data       | Pandas, openpyxl      |
| Database   | SQLite (default)      |

## Project Structure

```
ppa_model_automation/
├── ppa_model/                 # Main Django app
│   ├── models.py              # Session, Upload_Doc, Assumptions models
│   ├── views.py               # View functions for all PAA workflow steps
│   ├── urls.py                # URL routing
│   ├── forms.py               # Django forms
│   ├── templates/             # HTML templates
│   ├── static/                # Static assets (CSS, JS)
│   ├── utilities/             # Core calculation modules
│   │   ├── cashflow_estimation.py
│   │   ├── data_checks.py
│   │   ├── eligibility_test_and_grouping.py
│   │   ├── results.py
│   │   └── import_from_excel.py
│   └── datasheets/            # Sample/reference datasheets
├── ppa_model_automation/      # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── docs/                      # Documentation and reference files
└── manage.py                  # Django management script
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashiemugwa1997/ppa_model_automation.git
   cd ppa_model_automation/ppa_model_automation
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install django pandas openpyxl
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Start the development server**
   ```bash
   python manage.py runserver
   ```

6. Open your browser and navigate to `http://127.0.0.1:8000/`.

## License

This project is licensed under the [MIT License](LICENSE).

