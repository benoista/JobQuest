# JobQuest

## Description

**JobQuest** is an online platform that aggregates job offers. It allows recruiters to post job listings based on several criteria such as:

- Industry sector
- Contract type (full-time, part-time, freelance, etc.)
- Salary
- Location
- Working time (full-time, part-time, etc.)

Users can browse the job offers and apply directly via the platform.

## Features

- Account creation for both recruiters and candidates
- Recruiters can post job offers
- Filtering of job offers by sector, contract type, salary, location, and working time
- Users can browse and apply for jobs

## Technologies Used

- **Frontend**: Svelte, Vite
- **Backend**: ExpressJS
- **Database**: MySQL
- **API**: REST
- **Authentication**: JWT

## Installation


### Installation Steps

1. Clone the GitHub repository:

    ```bash
    git clone https://github.com:EpitechMscProPromo2027/T-WEB-501-NAN_2.git
    ```

2. Navigate to the project folder:

    ```bash
    cd T-WEB-501-NAN_2
    ```

3. Start the project:

    ```bash
    sudo docker compose up --build
    ```
   
    Don't forget to create / update the values in the `.env` file with your configuration (database credentials, API keys, etc.).

4. Access the application at `http://localhost:3001` (or according to your configuration).

## Usage

1. **Recruiter**: 
   - Create a recruiter account and access your dashboard to post job offers.
   - Fill out the form with the job details (sector, contract type, salary, etc.).
   
2. **User**:
   - Search for job offer
   - Apply directly to job offers by clicking the "Apply" button.
     
 4. **Client**:
     - Search for job offer
     - Create a user account, browse the job listings, and use filters to narrow down your search.
     - Apply directly to job offers by clicking the "Apply" button.

## Contribution

Don't touch the project plz


## Contact

For any questions or suggestions, feel free to contact us at: alexandre.benoist@epitech.eu or germain.rideau@epitech.eu

---

Thank you for using **JobQuest**!
