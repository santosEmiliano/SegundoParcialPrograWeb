const PDFDocument = require('pdfkit');
const path = require('path');

// Importamos las funciones de verificación 
const { hasUserPassed, getExamDate } = require('./verifications.controller'); 
const usuarios = require('../model/users.json');

// DATOS DEL CERTIFICADO 
const NOMBRE_EQUIPO = "CSCourses";
const NOMBRE_CERIFICADO = "Certificación en Fundamentos de REACT";
const CIUDAD = "Aguascalientes, México";
const NOMBRE_INSTRUCTOR = "Ing. Julian Hernández";
const NOMBRE_CEO = "SCCourses Corporation";

// PALETA DE COLORES
const COLOR_DARK_BG = '#080418'; 
const COLOR_WHITE = '#FFFFFF';
const COLOR_AQUA = '#00FFFF';    
const COLOR_PURPLE = '#8c79b4'; 
const COLOR_TEAL = '#41c7d4';    
const COLOR_YELLOW = '#f7f75e'; 
const COLOR_GRAY = '#AAAAAA';   

exports.generateCertificate = (req, res) => {
    const userId = req.userId;

    // Validar usuario y fecha
    if (!hasUserPassed(userId)) {
        return res.status(403).json({ error: "No puedes descargar un certificado sin haber aprobado el examen." });
    }

    const user = usuarios.find(u => u.cuenta === userId);
    const examDate = getExamDate(userId); 
    if (!user || !examDate) {
        return res.status(404).json({ error: "Datos del usuario o fecha de examen no encontrados." });
    }

    // Formatear datos (Oara utilizar las variables como locales)
    const userName = user.nombre;
    const formattedDate = examDate.toLocaleDateString('es-ES', { 
        day: 'numeric', month: 'long', year: 'numeric' 
    });

    // Definir rutas de Media
    const fontPath = path.join(__dirname, '../media/fuente/Electrolize-Regular.ttf');
    const logoPath = path.join(__dirname, '../media/icon.png');
    const firmaInstructorPath = path.join(__dirname, '../media/firma_instructor.png');
    const firmaCeoPath = path.join(__dirname, '../media/firma_encargado.png');

    // ========================================================================================================================
    //                                           CREACION PDF
    // ========================================================================================================================
    //Inicializamos el PDF
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margins: { top: 0, bottom: 0, left: 0, right: 0 } });

    // Configurar respuesta HTTP
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Certificado-REACT-${userId}.pdf`); 
    doc.pipe(res);

    // Fuente 
    try {
        doc.registerFont('Electrolize', fontPath);
    } catch (fontError) {
        console.error(`Error al cargar la fuente: ${fontError.message}. Usando Helvetica por defecto.`);
        // Si la fuente falla, usamos 'Helvetica' para que no crashee xd
        doc.registerFont('Electrolize', 'Helvetica'); 
    }

    // Diseño

    // Fondo 
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLOR_DARK_BG);

    //  Header y Footer
    const barHeight = 15;
    doc.rect(0, 0, doc.page.width / 2, barHeight).fill(COLOR_PURPLE);
    doc.rect(doc.page.width / 2, 0, doc.page.width / 2, barHeight).fill(COLOR_TEAL);
    doc.rect(0, doc.page.height - barHeight, doc.page.width / 2, barHeight).fill(COLOR_PURPLE);
    doc.rect(doc.page.width / 2, doc.page.height - barHeight, doc.page.width / 2, barHeight).fill(COLOR_TEAL);

    // Logo y Título 
    const pageMargin = 40;
    try {
        doc.image(logoPath, pageMargin, pageMargin, { width: 60 });
    } catch (e) { console.error("Error al cargar logo:", e.message); }

    doc.font('Electrolize')
        .fontSize(16)
        .fillColor(COLOR_WHITE)
        .text(NOMBRE_EQUIPO, 0, pageMargin + 20, { align: 'right', width: doc.page.width - pageMargin });

    // Contenido
    doc.font('Electrolize')
        .fontSize(32)
        .fillColor(COLOR_WHITE)
        .text('CERTIFICADO DE REACT', 0, 140, { align: 'center' });

    doc.fontSize(16).fillColor(COLOR_GRAY).text('Otorgado a:', 0, 190, { align: 'center' });

    // Nombre del Usuario 
    doc.fontSize(40)
        .fillColor(COLOR_YELLOW)
        .text(userName.toUpperCase(), 0, 220, { align: 'center' });

    doc.fontSize(16)
        .fillColor(COLOR_WHITE)
        .text('Por haber completado exitosamente la', 0, 280, { align: 'center' });

    // Nombre del Curso 
    doc.fontSize(20)
        .fillColor(COLOR_AQUA)
        .text(NOMBRE_CERIFICADO.toUpperCase(), 0, 305, { align: 'center' });

    // hr
    const yLine = 380;
    doc.moveTo(100, yLine).lineTo(doc.page.width - 100, yLine).lineWidth(0.5).stroke(COLOR_AQUA);

    // Firmas 
    const yFirmas = 400; 
    const xFirma1 = 140;
    const xFirma2 = 550;
    const firmaWidth = 150; 
    const firmaHeight = 60;  
    const yLineFirma = yFirmas + firmaHeight + 5; 
    const yNombreFirma = yLineFirma + 10; 
    const yTituloFirma = yNombreFirma + 15; 

    // Firma Instructor
    try {
        doc.image(firmaInstructorPath, xFirma1, yFirmas, { 
            fit: [firmaWidth, firmaHeight],
            align: 'center', 
            valign: 'center' 
        });
    } catch (e) { console.error("Error firma instructor:", e.message); }
    doc.moveTo(xFirma1, yLineFirma).lineTo(xFirma1 + firmaWidth, yLineFirma).stroke(COLOR_AQUA);
    doc.fontSize(12).fillColor(COLOR_WHITE).text(NOMBRE_INSTRUCTOR, xFirma1, yNombreFirma, { width: firmaWidth, align: 'center' });
    doc.fontSize(10).fillColor(COLOR_GRAY).text('Instructor Principal', xFirma1, yTituloFirma, { width: firmaWidth, align: 'center' });

    // Firma CEO
    try {
        doc.image(firmaCeoPath, xFirma2, yFirmas, { 
            fit: [firmaWidth, firmaHeight], 
            align: 'center', 
            valign: 'center' 
        });
    } catch (e) { console.error("Error firma CEO:", e.message); }
    doc.moveTo(xFirma2, yLineFirma).lineTo(xFirma2 + firmaWidth, yLineFirma).stroke(COLOR_AQUA);
    doc.fontSize(12).fillColor(COLOR_WHITE).text(NOMBRE_CEO, xFirma2, yNombreFirma, { width: firmaWidth, align: 'center' });
    doc.fontSize(10).fillColor(COLOR_GRAY).text(`CEO, ${NOMBRE_EQUIPO}`, xFirma2, yTituloFirma, { width: firmaWidth, align: 'center' });

    // Fecha y Ciudad 
    doc.fontSize(10).fillColor(COLOR_GRAY).text(`Emitido en ${CIUDAD}, el ${formattedDate}.`, 
        pageMargin, 
        doc.page.height - pageMargin - barHeight,
        { align: 'left' }
    );

    // Finalizar el documento
    doc.end();
};