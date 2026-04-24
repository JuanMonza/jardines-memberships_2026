import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../src/lib/supabaseClient.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'GET') {
        const { cedula } = req.query;

        try {
            if (!cedula) {
                return res.status(400).json({
                    success: false,
                    message: 'Cédula requerida'
                });
            }

            const { data: contratante } = await supabase
                .from('contratantes')
                .select('*')
                .eq('cedula', cedula.toString().trim())
                .single();

            if (!contratante) {
                return res.status(404).json({
                    success: false,
                    message: 'Contratante no encontrado'
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    nombre_contratante: contratante.nombre_contratante,
                    id_contrato: contratante.id_contrato,
                    id_persona: contratante.id_persona,
                    celular: contratante.celular,
                    edad_actual: contratante.edad_actual,
                    estado: contratante.estado,
                    zona: contratante.zona,
                    ciudad: contratante.ciudad,
                    departamento: contratante.departamento
                }
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
