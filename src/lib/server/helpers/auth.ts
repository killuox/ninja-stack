import { hash, verify } from '@node-rs/argon2'

const passwordParams = {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
}

export const generatePasswordHash = async (password: string) => {
    const passwordHash = await hash(password, passwordParams);

    return passwordHash;
}

export const verifyPassword = async (passwordHash: string, password: string) => {
    const validPassword = await verify(passwordHash, password, passwordParams);

    return validPassword;
}