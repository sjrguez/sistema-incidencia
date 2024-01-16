import * as bcrypt from 'bcrypt';

export class HashHelper {
    private static saltOrRounds: number = 10;

    public static async  encrypt(password: string) {
        return await bcrypt.hash(
            password,
            this.saltOrRounds
        );

    }

    public static async compare(
        plain: string,
        encrypted: string,
    ): Promise<boolean> {
        return await bcrypt.compare(plain, encrypted);
    }

}    
