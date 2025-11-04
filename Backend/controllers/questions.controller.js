const questions = require("../data/questions");
const { passedRegister } = require("./verifications.controller"); 
const usuarios = require("../model/users.json");

const startQuiz = (req, res) => {
    const publicQuestions = preguntas()
    console.log(publicQuestions);
    // El examen dura 45 minutos.
    const duracionEnMinutos = 50;
    const duracionEnSegundos = duracionEnMinutos * 60; // 50 * 60 = 3,000 segundos

    const userBuscado = usuarios.find(u => u.cuenta === req.userId);

    res.status(200).json({
        message: "Preguntas listas. ¡Éxito!",
        questions: publicQuestions,
        duration: duracionEnSegundos,
        date: new Date().toLocaleDateString(),
        user: userBuscado.nombre
    });
};

const preguntas = () => {
    const preguntas = shuffle(questions.map(({id, text, options}) => 
        ({id: id, text: text, options: shuffle(options)})));

    return preguntas.slice(0, 8);
}

const shuffle = (array) => {
    const newArray = [...array];
    let index = newArray.length;
    while (index != 0) {
        let randomIndex = Math.floor(Math.random() * index);
        index--;
        [newArray[index], newArray[randomIndex]] = [newArray[randomIndex], newArray[index]];
        }   

    return newArray;
}

const submitAnswers = (req, res) => {
    try {
        const userAnswers = Array.isArray(req.body.answers) ? req.body.answers : [];
        let score = 0;
        const details = [];

        for (const userAnswer of userAnswers) {
            const preguntaQuizz = questions.find(q => q.id === userAnswer.id);
            if (!preguntaQuizz) continue;
            const isCorrect = userAnswer.answer === preguntaQuizz.correct;
            if (isCorrect) score++;

            details.push({
                id: preguntaQuizz.id,
                text: preguntaQuizz.text,
                yourAnswer: userAnswer.answer,
                correctAnswer: preguntaQuizz.correct,
                correct: isCorrect
            });
        }

        console.log(details);
        const approved = score>=6 ? true : false;
    
        

        if (approved) {
            passedRegister(req.userId);
          // AQUI SE LLAMA A passedRegister en caso de que queramos que solo se registre como hecho el examen si lo aprobó
        }

        return res.status(200).json({
            message: "Respuestas evaluadas.",
            score: score,
            total: 8,
            details: details,
            approved
        });
    } catch (error) {
        console.error('Error fatal al calificar o registrar el examen:', error);
        return res.status(500).json({ error: 'Error interno del servidor al procesar las respuestas' });
    }
}

module.exports = { startQuiz, submitAnswers}