import bcrypt from 'bcrypt';

/**
 * Hash the saved password in the database for further security
 * @param password 
 * @returns 
 */
const hashPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err: Error | undefined, salt: string) => {
            if (err) {
                reject(err);
            } else {
                bcrypt.hash(password, salt, (err: Error | undefined, hash: string) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            }
        });
    });
};

/**
 * Helper function for login logic. Compares password with hashed password in the database
 * @param password 
 * @param hashed 
 * @returns 
 */
const comparePassword = (password: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(password, hashed);
};

export { hashPassword, comparePassword };
