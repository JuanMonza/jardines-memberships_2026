import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || ''
    }
});

// Generar código 2FA
export const generarCodigo2FA = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Enviar código 2FA
export const enviarCodigo2FA = async (email: string, codigo: string): Promise<boolean> => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER || 'sistema@jardinesdelrenacer.co',
            to: email,
            subject: '🔐 Código de Verificación - Jardines del Renacer',
            html: `
                <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #3957b8 0%, #5a7bc9 100%); padding: 20px; border-radius: 10px;">
                    <div style="background: white; padding: 30px; border-radius: 8px; max-width: 500px; margin: 0 auto;">
                        <h1 style="color: #3957b8; text-align: center; margin-bottom: 20px;">🔐 Verificación de Identidad</h1>
                        <p style="color: #333; font-size: 16px;">Hola,</p>
                        <p style="color: #666; font-size: 14px;">Se ha solicitado acceso a tu cuenta de administrador. Usa este código:</p>
                        <div style="background: #f0f0f0; border: 2px solid #3957b8; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                            <h2 style="color: #3957b8; font-size: 36px; letter-spacing: 5px; margin: 0;">${codigo}</h2>
                        </div>
                        <p style="color: #ff6b6b; font-size: 12px;">⏰ Expira en 10 minutos.</p>
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                        <p style="color: #999; font-size: 12px; text-align: center;">
                            © 2026 Jardines del Renacer. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            `
        });
        return true;
    } catch (error) {
        console.error('Error enviando email:', error);
        return false;
    }
};

// Enviar confirmación de login
export const enviarConfirmacionLogin = async (email: string): Promise<boolean> => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER || 'sistema@jardinesdelrenacer.co',
            to: email,
            subject: '✅ Acceso autorizado - Jardines del Renacer',
            html: `
                <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #3957b8 0%, #5a7bc9 100%); padding: 20px; border-radius: 10px;">
                    <div style="background: white; padding: 30px; border-radius: 8px; max-width: 500px; margin: 0 auto;">
                        <h1 style="color: #22C55E; text-align: center;">✅ Acceso Exitoso</h1>
                        <p style="color: #333;">Tu cuenta ha sido accedida correctamente a las ${new Date().toLocaleTimeString('es-CO')}.</p>
                        <p style="color: #ff6b6b; font-size: 12px;">Si no fuiste tú, cambia tu contraseña inmediatamente.</p>
                    </div>
                </div>
            `
        });
        return true;
    } catch (error) {
        console.error('Error enviando email:', error);
        return false;
    }
};
