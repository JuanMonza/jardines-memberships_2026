// Base de datos simulada de afiliados (esto normalmente vendría de un servidor)
// Cada cédula representa un contrato que puede tener hasta 10 afiliados + mascotas
const database = {
    '1234567890': [
        {
            id: 'MEM-2024-001',
            nombre: 'Ana María Torres González',
            parentesco: 'Titular',
            fechaAfiliacion: '15/03/2024',
            activo: true,
            ultimoPago: '01/11/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-2024-001',
            nombre: 'Carlos Torres Martínez',
            parentesco: 'Cónyuge',
            fechaAfiliacion: '15/03/2024',
            activo: true,
            ultimoPago: '01/11/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-2024-001',
            nombre: 'Sofía Torres Martínez',
            parentesco: 'Hija',
            fechaAfiliacion: '15/03/2024',
            activo: true,
            ultimoPago: '01/11/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-2024-001',
            nombre: 'Lucas Torres Martínez',
            parentesco: 'Hijo',
            fechaAfiliacion: '15/03/2024',
            activo: true,
            ultimoPago: '01/11/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-2024-001',
            nombre: 'María González Vda. de Torres',
            parentesco: 'Madre',
            fechaAfiliacion: '15/03/2024',
            activo: true,
            ultimoPago: '01/11/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-MASC-001',
            nombre: 'Max',
            parentesco: 'Mascota de la familia',
            especie: 'Perro - Labrador',
            fechaAfiliacion: '15/03/2024',
            activo: true,
            ultimoPago: '01/11/2025',
            tipo: 'mascota'
        }
    ],
    '0987654321': [
        {
            id: 'MEM-2024-045',
            nombre: 'Juan Pérez Rodríguez',
            parentesco: 'Titular',
            fechaAfiliacion: '22/01/2024',
            activo: false,
            ultimoPago: '15/08/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-2024-045',
            nombre: 'María Pérez López',
            parentesco: 'Hija',
            fechaAfiliacion: '22/01/2024',
            activo: false,
            ultimoPago: '15/08/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-2024-045',
            nombre: 'Pedro Pérez López',
            parentesco: 'Hijo',
            fechaAfiliacion: '22/01/2024',
            activo: false,
            ultimoPago: '15/08/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-MASC-045',
            nombre: 'Luna',
            parentesco: 'Mascota de la familia',
            especie: 'Gato - Siamés',
            fechaAfiliacion: '22/01/2024',
            activo: false,
            ultimoPago: '15/08/2025',
            tipo: 'mascota'
        }
    ],
    '1122334455': [
        {
            id: 'MEM-2024-078',
            nombre: 'Roberto Gómez Silva',
            parentesco: 'Titular',
            fechaAfiliacion: '10/06/2024',
            activo: true,
            ultimoPago: '05/11/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-2024-078',
            nombre: 'Laura Gómez Méndez',
            parentesco: 'Cónyuge',
            fechaAfiliacion: '10/06/2024',
            activo: true,
            ultimoPago: '05/11/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-2024-078',
            nombre: 'Daniel Gómez Méndez',
            parentesco: 'Hijo',
            fechaAfiliacion: '10/06/2024',
            activo: true,
            ultimoPago: '05/11/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-2024-078',
            nombre: 'Valentina Gómez Méndez',
            parentesco: 'Hija',
            fechaAfiliacion: '10/06/2024',
            activo: true,
            ultimoPago: '05/11/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-2024-078',
            nombre: 'Jorge Gómez Pérez',
            parentesco: 'Padre',
            fechaAfiliacion: '10/06/2024',
            activo: true,
            ultimoPago: '05/11/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-2024-078',
            nombre: 'Rosa Silva de Gómez',
            parentesco: 'Madre',
            fechaAfiliacion: '10/06/2024',
            activo: true,
            ultimoPago: '05/11/2025',
            tipo: 'persona'
        },
        {
            id: 'MEM-MASC-078',
            nombre: 'Rocky',
            parentesco: 'Mascota de la familia',
            especie: 'Perro - Golden Retriever',
            fechaAfiliacion: '10/06/2024',
            activo: true,
            ultimoPago: '05/11/2025',
            tipo: 'mascota'
        },
        {
            id: 'MEM-MASC-078-B',
            nombre: 'Mía',
            parentesco: 'Mascota de la familia',
            especie: 'Gato - Persa',
            fechaAfiliacion: '10/06/2024',
            activo: true,
            ultimoPago: '05/11/2025',
            tipo: 'mascota'
        }
    ]
};

/**
 * Función principal de verificación de membresía
 */
function verificarMembresia() {
    const cedulaInput = document.getElementById('cedula-input');
    const cedula = cedulaInput.value.trim();
    
    // Validar que se ingresó una cédula
    if (!cedula) {
        alert('Por favor, ingrese un número de cédula');
        cedulaInput.focus();
        return;
    }

    // Validar formato de cédula (solo números)
    if (!/^\d+$/.test(cedula)) {
        alert('El número de cédula solo debe contener dígitos');
        cedulaInput.focus();
        return;
    }

    // Buscar en la base de datos
    const afiliados = database[cedula];
    
    const resultsContainer = document.getElementById('results-container');
    const noResults = document.getElementById('no-results');
    const affiliatesList = document.getElementById('affiliates-list');

    if (afiliados && afiliados.length > 0) {
        // Mostrar resultados
        noResults.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        
        // Obtener información del contrato (mismo ID para todos)
        const contratoId = afiliados[0].id.split('-MASC-')[0]; // Obtener el ID base sin mascota
        const personasCount = afiliados.filter(a => a.tipo === 'persona').length;
        const mascotasCount = afiliados.filter(a => a.tipo === 'mascota').length;
        
        // Limpiar completamente los resultados anteriores
        const membershipCards = document.getElementById('membership-cards');
        membershipCards.innerHTML = '';
        
        // Eliminar el encabezado de contrato anterior si existe
        const contratoInfoAnterior = resultsContainer.querySelector('.bg-white\\/10.backdrop-blur-md');
        if (contratoInfoAnterior) {
            contratoInfoAnterior.remove();
        }
        
        // Agregar encabezado de información del contrato
        const contratoInfo = document.createElement('div');
        contratoInfo.className = 'bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 text-white';
        contratoInfo.innerHTML = `
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h4 class="text-2xl font-bold mb-2">Contrato de Membresía</h4>
                    <p class="text-lg font-mono">${afiliados.find(a => a.tipo === 'persona')?.id || contratoId}</p>
                </div>
                <div class="flex gap-4">
                    <div class="text-center bg-white/10 rounded-lg px-4 py-2">
                        <p class="text-3xl font-bold">${personasCount}</p>
                        <p class="text-sm opacity-80">Personas</p>
                    </div>
                    <div class="text-center bg-white/10 rounded-lg px-4 py-2">
                        <p class="text-3xl font-bold">${mascotasCount}</p>
                        <p class="text-sm opacity-80">Mascotas</p>
                    </div>
                    <div class="text-center bg-white/10 rounded-lg px-4 py-2">
                        <p class="text-3xl font-bold">${afiliados.length}/10</p>
                        <p class="text-sm opacity-80">Total</p>
                    </div>
                </div>
            </div>
        `;
        
        // Insertar el nuevo encabezado al inicio de results-container
        const tituloResultados = resultsContainer.querySelector('h3');
        resultsContainer.insertBefore(contratoInfo, tituloResultados);
        
        // Encontrar el titular
        const titular = afiliados.find(a => a.tipo === 'persona' && a.parentesco === 'Titular');
        const dependientes = afiliados.filter(a => !(a.tipo === 'persona' && a.parentesco === 'Titular'));
        
        // Crear tarjeta del titular primero
        if (titular) {
            const titularCard = createMembershipCard(titular, 0, true, cedula);
            membershipCards.appendChild(titularCard);
        }
        
        // Crear tarjetas de dependientes (ocultas inicialmente)
        dependientes.forEach((afiliado, index) => {
            const card = createMembershipCard(afiliado, index + 1, false, cedula);
            membershipCards.appendChild(card);
        });

        // Scroll suave hacia los resultados
        setTimeout(() => {
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        // No se encontraron resultados
        resultsContainer.classList.add('hidden');
        noResults.classList.remove('hidden');
        
        setTimeout(() => {
            noResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

/**
 * Detecta el género basado en el nombre
 */
function detectarGenero(nombre) {
    const nombreLower = nombre.toLowerCase();
    const nombresComunes = {
        mujer: ['ana', 'maría', 'sofía', 'laura', 'valentina', 'andrea', 'carolina', 'paula', 'diana', 'rosa', 'marta', 'elena', 'isabel', 'carmen', 'pilar', 'lucía', 'claudia', 'patricia', 'mónica', 'sandra', 'natalia', 'cristina', 'beatriz', 'martha', 'silvia', 'gloria', 'teresa', 'raquel', 'alejandra', 'gabriela', 'fernanda', 'mariana', 'daniela', 'camila', 'juliana', 'isabella', 'catalina'],
        hombre: ['juan', 'carlos', 'pedro', 'luis', 'jorge', 'miguel', 'andrés', 'fernando', 'josé', 'david', 'daniel', 'roberto', 'ricardo', 'mario', 'pablo', 'diego', 'alberto', 'manuel', 'francisco', 'javier', 'antonio', 'rafael', 'sergio', 'eduardo', 'felipe', 'santiago', 'sebastián', 'gabriel', 'nicolás', 'alejandro', 'lucas', 'mateo']
    };
    
    // Buscar en nombres comunes
    for (let nombreMujer of nombresComunes.mujer) {
        if (nombreLower.includes(nombreMujer)) return 'mujer';
    }
    for (let nombreHombre of nombresComunes.hombre) {
        if (nombreLower.includes(nombreHombre)) return 'hombre';
    }
    
    // Por defecto basarse en la terminación
    if (nombreLower.endsWith('a') || nombreLower.endsWith('ía')) return 'mujer';
    return 'hombre';
}

/**
 * Genera avatar usando emoji o icono según el tipo y género
 */
function generarAvatar(afiliado) {
    if (afiliado.tipo === 'mascota') {
        const esPerro = afiliado.especie?.toLowerCase().includes('perro');
        return esPerro ? '🐕' : '🐱';
    } else {
        const genero = detectarGenero(afiliado.nombre);
        return genero === 'mujer' ? '👩' : '👨';
    }
}

/**
 * Genera icono de logo de la entidad desde carpeta assets
 */
function generarLogoHTML(tipo) {
    // Todos usan el mismo logo pequeño de las tarjetas
    return `<img src="assets/logo-tarjetas.webp" alt="Logo Jardines del Renacer" class="entity-logo" onerror="this.style.display='none'">`;
}

/**
 * Crea una tarjeta visual de membresía (estilo tarjeta de crédito)
 */
function createMembershipCard(afiliado, index, esTitular = false, cedulaContrato = '') {
    const card = document.createElement('div');
    const cardClass = esTitular ? 'membership-card titular' : 'membership-card dependiente';
    card.className = `${cardClass} rounded-2xl p-6 text-white fade-in`;
    card.style.animationDelay = `${index * 0.15}s`;
    card.dataset.cedula = cedulaContrato;
    
    const statusBadgeColor = afiliado.activo ? 'bg-active-status' : 'bg-inactive-status';
    const statusText = afiliado.activo ? 'ACTIVO' : 'INACTIVO';
    
    const entidad = afiliado.tipo === 'mascota' ? 'Renacer Mascotas' : 'Jardines del Renacer';
    const subtitulo = afiliado.tipo === 'mascota' ? `Convenio Especial - ${afiliado.especie}` : afiliado.parentesco;
    
    // Ajustar padding superior si es titular (por el banner)
    const paddingTop = esTitular ? 'pt-10' : 'pt-6';
    
    // Generar avatar emoji y logo
    const avatarEmoji = generarAvatar(afiliado);
    const logoHTML = generarLogoHTML(afiliado.tipo);
    
    card.innerHTML = `
        <div class="${paddingTop} relative" style="padding-left: 70px;">
            <!-- Avatar Emoji Flotante -->
            <div class="avatar-3d" style="font-size: 4rem; left: -15px;">${avatarEmoji}</div>
            
            <!-- Logo de la entidad -->
            ${logoHTML}
            
            <!-- Nombre de la entidad -->
            <h3 class="text-lg font-bold mb-1 drop-shadow-md">${entidad}</h3>
            <p class="text-xs text-white/70 uppercase tracking-widest mb-4">Club de Aliados</p>
            
            <!-- Nombre del afiliado -->
            <div class="mb-6">
                <p class="text-white/60 text-xs uppercase tracking-wider mb-1">${afiliado.tipo === 'mascota' ? 'Nombre de la Mascota' : 'Nombre del Afiliado'}</p>
                <p class="text-xl font-bold drop-shadow-md">${afiliado.nombre.toUpperCase()}</p>
                <p class="text-sm text-white/80 mt-1">${subtitulo}</p>
            </div>
            
            <!-- Fechas -->
            <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="bg-white/10 rounded-lg p-2">
                    <p class="text-white/60 text-xs uppercase tracking-wider mb-1">Afiliación</p>
                    <p class="text-xs font-bold">${afiliado.fechaAfiliacion}</p>
                </div>
                <div class="bg-white/10 rounded-lg p-2">
                    <p class="text-white/60 text-xs uppercase tracking-wider mb-1">Último Pago</p>
                    <p class="text-xs font-bold">${afiliado.ultimoPago}</p>
                </div>
            </div>
            
            <!-- Footer con ID y Estado -->
            <div class="flex justify-between items-end">
                <div>
                    <p class="text-white/60 text-xs uppercase tracking-wider mb-1">ID Membresía</p>
                    <p class="text-sm font-mono font-bold">${afiliado.id}</p>
                </div>
                <div>
                    <span class="${statusBadgeColor} px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        ${statusText}
                    </span>
                </div>
            </div>
        </div>
    `;
    
    // Agregar evento de click solo al titular
    if (esTitular) {
        card.addEventListener('click', function() {
            toggleDependientes(cedulaContrato);
        });
    }
    
    return card;
}

/**
 * Función para mostrar/ocultar dependientes
 */
function toggleDependientes(cedula) {
    const dependientes = document.querySelectorAll(`.membership-card.dependiente[data-cedula="${cedula}"]`);
    dependientes.forEach(card => {
        card.classList.toggle('show');
    });
}

/**
 * Permitir búsqueda con Enter
 */
document.addEventListener('DOMContentLoaded', function() {
    const cedulaInput = document.getElementById('cedula-input');
    
    if (cedulaInput) {
        cedulaInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verificarMembresia();
            }
        });

        // Solo permitir números en el input
        cedulaInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
});

