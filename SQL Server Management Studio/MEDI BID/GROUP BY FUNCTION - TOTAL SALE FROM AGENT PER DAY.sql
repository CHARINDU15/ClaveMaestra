SELECT NIC, SUM(O_VALUE) AS PER_DAY_TOTAL_SALE 
FROM P_ORDER
WHERE O_DATE='2023-01-12'
GROUP BY NIC

