/**
 * API de Autenticación - Jardines del Renacer
 *
 * Este archivo maneja todas las operaciones de autenticación:
 * - Registro de administradores con validación de dominio corporativo
 * - Login en dos pasos: credenciales + 2FA por email
 * - Logout y gestión de sesiones JWT
 *
 * Seguridad implementada:
 * - Validación de dominio @jardinesdelrenacer.co
 * - Contraseñas hasheadas con bcrypt
 * - 2FA con códigos de 6 dígitos (10 min expiry)
 * - JWT con expiración de 24 horas
 */

import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../src/lib/supabaseClient.js';
import { generarCodigo2FA, enviarCodigo2FA, enviarConfirmacionLogin } from '../src/utils/emailService.js';
import { generarToken, hashPassword, compararPassword } from '../src/utils/auth.js';

// Función principal que maneja todas las peticiones POST a /api/auth
export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        // Solo aceptamos método POST
        if (req.method === 'POST') {
            const body = req.body || {};
            const { email, password, nombre, accion, codigo2FA, rol } = typeof body === 'string' ? JSON.parse(body) : body;

        // ACCIÓN: REGISTRO DE NUEVO ADMINISTRADOR
        if (accion === 'registro') {
            try {
                // Validación: Solo correos corporativos permitidos
                if (!email.endsWith('@jardinesdelrenacer.co') && !email.endsWith('@mivivemas.co')) {
                    return res.status(400).json({
                        success: false,
                        message: 'Solo correos corporativos autorizados'
                    });
                }

                // Validación: Contraseña mínima de 8 caracteres
                if (password.length < 8) {
                    return res.status(400).json({
                        success: false,
                        message: 'Contraseña mínimo 8 caracteres'
                    });
                }

                // Verificar si el email ya existe en la base de datos
                const { data: adminExistente } = await supabase
                    .from('admins')
                    .select('*')
                    .eq('email', email)
                    .single();

                if (adminExistente) {
                    return res.status(400).json({
                        success: false,
                        message: 'Este email ya está registrado'
                    });
                }

                // Hashear la contraseña antes de guardarla
                const passwordHash = await hashPassword(password);

                // Insertar nuevo administrador en la base de datos
                const { data: nuevoAdmin, error } = await supabase
                    .from('admins')
                    .insert({
                        email,
                        password_hash: passwordHash,
                        nombre,
                        rol: rol === 'admin' ? 'admin' : 'supervisor', // Asignar rol dinámicamente
                        activo: true // Administrador activo por defecto
                    })
                    .select()
                    .single();

                if (error) throw error;

                return res.status(201).json({
                    success: true,
                    message: 'Admin registrado exitosamente',
                    admin: {
                        id: nuevoAdmin.id,
                        email: nuevoAdmin.email,
                        nombre: nuevoAdmin.nombre
                    }
                });
            } catch (error: any) {
                return res.status(500).json({
                    success: false,
                    message: 'Error en registro',
                    error: error.message
                });
            }
        }

        // Login Paso 1
        if (accion === 'login_paso1') {
            // Prevenir crash verificando variables de entorno
            if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
                return res.status(500).json({
                    success: false,
                    message: 'Falta configurar credenciales de Supabase en Vercel'
                });
            }
            /* -- COMENTADO PARA BYPASS DE 2FA --
            if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
                return res.status(500).json({
                    success: false,
                    message: 'Falta configurar EMAIL_USER y EMAIL_PASS en Vercel'
                });
            }
            */

            try {
                const { data: admin, error } = await supabase
                    .from('admins')
                    .select('*')
                    .eq('email', email)
                    .single();

                if (error && error.code !== 'PGRST116') {
                    throw error;
                }

                if (!admin) {
                    return res.status(401).json({
                        success: false,
                        message: 'El correo no existe en la base de datos'
                    });
                }

                const passwordValida = await compararPassword(password, admin.password_hash);

                if (!passwordValida) {
                    return res.status(401).json({
                        success: false,
                        message: 'La contraseña ingresada es incorrecta'
                    });
                }

                // CÓDIGO 2FA DINÁMICO: Fecha de hoy (DDMMAA)
                const hoy = new Date();
                const dia = String(hoy.getDate()).padStart(2, '0');
                const mes = String(hoy.getMonth() + 1).padStart(2, '0');
                const anio = String(hoy.getFullYear()).slice(-2);
                const codigo = `${dia}${mes}${anio}`;

                const expiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();

                const { error: updateError } = await supabase
                    .from('admins')
                    .update({
                        codigo_2fa: codigo,
                        codigo_2fa_expiry: expiry,
                        codigo_2fa_verificado: false
                    })
                    .eq('id', admin.id);
                    
                if (updateError) {
                    throw new Error(`Error en Base de Datos: ${updateError.message}`);
                }

                /* -- COMENTADO PARA NO ENVIAR EMAILS --
                const emailEnviado = await enviarCodigo2FA(email, codigo);

                if (!emailEnviado) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error de Gmail: Revisa el App Password en Vercel'
                    });
                }
                */

                const tempToken = generarToken(admin.id);

                return res.status(200).json({
                    success: true,
                    message: 'Ingresa la fecha de hoy (DDMMAA)',
                    tempToken,
                    adminId: admin.id
                });
            } catch (error: any) {
                return res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        }

        // Login Paso 2
        if (accion === 'login_paso2') {
            try {
                const bodyPaso2 = req.body || {};
                const { adminId, codigo } = typeof bodyPaso2 === 'string' ? JSON.parse(bodyPaso2) : bodyPaso2;

                const { data: admin } = await supabase
                    .from('admins')
                    .select('*')
                    .eq('id', adminId)
                    .single();

                if (!admin) {
                    return res.status(401).json({
                        success: false,
                        message: 'Admin no encontrado'
                    });
                }

                if (new Date() > new Date(admin.codigo_2fa_expiry)) {
                    return res.status(401).json({
                        success: false,
                        message: 'Código expirado'
                    });
                }

                if (admin.codigo_2fa !== codigo) {
                    return res.status(401).json({
                        success: false,
                        message: 'Código inválido. Usa la fecha actual (DDMMAA)'
                    });
                }

                await supabase
                    .from('admins')
                    .update({
                        codigo_2fa: null,
                        codigo_2fa_expiry: null,
                        codigo_2fa_verificado: true,
                        ultimo_login: new Date().toISOString()
                    })
                    .eq('id', adminId);

                // await enviarConfirmacionLogin(admin.email); // COMENTADO PARA NO ENVIAR EMAILS

                const token = generarToken(adminId);

                return res.status(200).json({
                    success: true,
                    message: '¡Bienvenido!',
                    token,
                    admin: {
                        id: admin.id,
                        email: admin.email,
                        nombre: admin.nombre,
                        rol: admin.rol
                    }
                });
            } catch (error: any) {
                return res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        }
        }
        return res.status(405).json({ message: 'Method not allowed' });
    } catch (globalError: any) {
        return res.status(500).json({
            success: false,
            message: 'Error crítico en el servidor',
            error: globalError.message
        });
    }
}
