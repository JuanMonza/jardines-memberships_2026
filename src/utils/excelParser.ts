import { XLSX } from 'xlsx';
import { supabase } from '../lib/supabaseClient';

export const procesarExcelContratantes = async (
    archivo: Buffer,
    adminId: string
): Promise<{ exitosos: number; errores: number; detalles: any[] }> => {
    try {
        const workbook = XLSX.read(archivo, { type: 'buffer' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const datos = XLSX.utils.sheet_to_json(worksheet);

        const resultados = {
            exitosos: 0,
            errores: 0,
            detalles: [] as any[]
        };

        for (const fila of datos) {
            try {
                const { error } = await supabase.from('contratantes').insert({
                    nombre_contratante: fila.nombreContratante || '',
                    cedula: fila.cedula?.toString().trim() || '',
                    id_contrato: fila.idContrato?.toString().trim() || '',
                    id_persona: fila.idPersona || '',
                    celular: fila.celular || '',
                    email: fila.email || '',
                    edad_actual: parseInt(fila.edadActual) || 0,
                    fecha_nacimiento: fila.fechaNacimiento || null,
                    estado: fila.estado?.toLowerCase() === 'activo' ? 'activo' : 'inactivo',
                    zona: fila.zona || '',
                    ciudad: fila.ciudad || '',
                    departamento: fila.departamento || '',
                    direccion: fila.direccion || '',
                    tipo_plan: fila.tipoPlan || '',
                    fecha_afiliacion: new Date().toISOString(),
                    ultimo_pago: fila.ultimoPago || null,
                    deuda: parseFloat(fila.deuda) || 0,
                    cargado_por: adminId
                });

                if (error) {
                    resultados.errores++;
                    resultados.detalles.push({
                        cedula: fila.cedula,
                        error: error.message
                    });
                } else {
                    resultados.exitosos++;
                }
            } catch (error: any) {
                resultados.errores++;
                resultados.detalles.push({
                    cedula: fila.cedula,
                    error: error.message
                });
            }
        }

        return resultados;
    } catch (error: any) {
        throw new Error(`Error procesando Excel: ${error.message}`);
    }
};
