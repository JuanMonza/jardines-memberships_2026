import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro';
const JWT_EXPIRE = '24h';

export const generarToken = (adminId: string): string => {
    return jwt.sign({ id: adminId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export const verificarToken = (token: string): { id: string } | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as { id: string };
    } catch {
        return null;
    }
};

export const hashPassword = async (password: string): Promise<string> => {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const compararPassword = async (password: string, hash: string): Promise<boolean> => {
    const bcrypt = require('bcryptjs');
    return bcrypt.compare(password, hash);
};
