-- Declare and set the variables
SET @RowsByPage = 5;
-- Get the total count of advertisements
SET @AdvertisementsCount = (SELECT COUNT(*) FROM advertisements);

-- Calculate the page number based on the total count and rows per page
SET @TotalPageNumber = CEIL(@AdvertisementsCount / @RowsByPage);

-- Declare and set the page number given by the user
SET @PageNumber = ?;

-- Calculate the offset based on the page number and rows per page
SET @Offset = (@PageNumber - 1) * @RowsByPage;

-- Query to fetch the results with pagination
SELECT advertisements.id, advertisements.title,
       advertisements.short_description, (SELECT NAME FROM companies WHERE company = companies.id) AS company,
       advertisements.localization, advertisements.salary,
       advertisements.contract_type, advertisements.date,
       advertisements.working_time, (SELECT NAME FROM sector WHERE id_sector = sector.id) AS sector
FROM advertisements
ORDER BY id
LIMIT @RowsByPage OFFSET @Offset;
