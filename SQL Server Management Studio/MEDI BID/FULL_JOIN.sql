SELECT FIRST_NAME + LAST_NAME  AS  FULL_NAME ,A_NAME
FROM EMPLOYEE
FULL JOIN REGIONAL_AGENCY
ON EMPLOYEE.AGENCY_ID =REGIONAL_AGENCY.AGENCY_ID