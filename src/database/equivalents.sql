-- Get all icon requests, sorted by number of duplicates / popularity / requesters
SELECT
    query.id,
    query.name,
    query.component,
    subquery.url,
    subquery.requesters
FROM
    icon_requests query
    INNER JOIN (
        SELECT
            url,
            COUNT(*) AS requesters
        FROM
            icon_requests ir2
        GROUP BY
            url) subquery ON query.url = subquery.url
ORDER BY
    requesters DESC;

