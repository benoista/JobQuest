
-- Query to fetch the results with pagination
SELECT advertisements.id, advertisements.title,
       advertisements.short_description, (SELECT NAME FROM companies WHERE company = companies.id) AS company,
       advertisements.localization, advertisements.salary,
       advertisements.contract_type, advertisements.date,
       advertisements.working_time, (SELECT NAME FROM sector WHERE id_sector = sector.id) AS sector
FROM advertisements
ORDER BY id
