DELIMITER //

CREATE PROCEDURE DCT_SP_COPY_AND_TRUNCATE(
    IN SOURCE_TABLE VARCHAR(50),
    IN DESTINATION_TABLE VARCHAR(50)
)
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
BEGIN
    -- Declare a variable for the SQL statement
    SET @sql_statement = CONCAT('INSERT INTO ', DESTINATION_TABLE, ' SELECT * FROM ', SOURCE_TABLE);

    -- Start a transaction
    START TRANSACTION;

    -- Prepare and execute the SQL statement
    PREPARE stmt FROM @sql_statement;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

    -- Truncate the source table
    SET @truncate_statement = CONCAT('TRUNCATE TABLE ', SOURCE_TABLE);
    PREPARE truncate_stmt FROM @truncate_statement;
    EXECUTE truncate_stmt;
    DEALLOCATE PREPARE truncate_stmt;

    -- Commit the transaction
    COMMIT;
END //

DELIMITER ;
