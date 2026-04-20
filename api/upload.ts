import { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';
import { procesarExcelContratantes } from '../src/utils/excelParser';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        try {
            const form = formidable({ uploadDir: '/tmp' });
            const [fields, files] = await form.parse(req);
            
            const archivo = files.archivo?.[0];
            if (!archivo) {
                return res.status(400).json({
                    success: false,
                    message: 'Archivo requerido'
                });
            }

            const adminId = fields.adminId?.[0];
            if (!adminId) {
                return res.status(401).json({
                    success: false,
                    message: 'Admin ID requerido'
                });
            }

            const buffer = fs.readFileSync(archivo.filepath);
            const resultados = await procesarExcelContratantes(buffer, adminId);

            fs.unlinkSync(archivo.filepath);

            return res.status(200).json({
                success: true,
                message: `${resultados.exitosos} registros cargados, ${resultados.errores} errores`,
                resultados
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
