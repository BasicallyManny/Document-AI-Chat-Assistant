import bcrypt from 'bcrypt';

/**
 * This function hashes the provided password using the bcrypt library.
 * It generates a salt with a length of 12 and then hashes the password using that salt.
 * The function returns a Promise that resolves to the hashed password.
 * 
 * @param password - The password to be hashed
 * @returns A Promise that resolves to the hashed password
 */
const hashPassword = (password: string): Promise<string> => {
    // Create a new Promise that will be resolved with the hashed password
    return new Promise((resolve, reject) => {
        // Generate a salt with a length of 12
        bcrypt.genSalt(12, (err: Error | undefined, salt: string) => {
            // If there was an error generating the salt, reject the Promise with the error
            if (err) {
                reject(err);
            } else {
                // Hash the password using the generated salt
                bcrypt.hash(password, salt, (err: Error | undefined, hash: string) => {
                    // If there was an error hashing the password, reject the Promise with the error
                    if (err) {
                        reject(err);
                    } else {
                        // If the password was hashed successfully, resolve the Promise with the hashed password
                        resolve(hash);
                    }
                });
            }
        });
    });
};

/**
 * This function compares the provided plain text password with a hashed password from the
 * database. It uses the bcrypt library to perform the comparison.
 *
 * @param password - The plain text password to be compared
 * @param hashed - The hashed password from the database
 * @returns A Promise that resolves to a boolean value. If the passwords match, the Promise
 *          resolves to true. If they don't match, the Promise resolves to false.
 */
const comparePassword = (password: string, hashed: string): Promise<boolean> => {
    // Create a new Promise that will be resolved with a boolean value
    return new Promise((resolve, reject) => {
        // Use the bcrypt.compare function to compare the plain text password with the hashed password
        bcrypt.compare(password, hashed, (err: Error | undefined, result: boolean) => {
            // If there was an error during the comparison, reject the Promise with the error
            if (err) {
                reject(err);
            } else {
                // If the comparison was successful, resolve the Promise with the result
                resolve(result);
            }
        });
    });
};

export { hashPassword, comparePassword };
