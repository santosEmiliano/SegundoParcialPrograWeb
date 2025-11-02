const questions = require("../data/questions");


const startQuiz = (req, res) => {
    const publicQuestions = preguntas()
    console.log(publicQuestions);
    res.status(200).json({
        message: "Preguntas listas. ¡Éxito!",
        questions: publicQuestions
    });
};

const preguntas = () => {
    const preguntas = shuffle(questions.map(({id, text, options}) => 
        ({id: id, text: text, options: shuffle(options)})));

    return preguntas.slice(0, 8);
}

/*
Metodo de la baraja:
    Esta chido, haces una copia del array
    Agarras el maximo de tam que tiene
    Vas intercambiando posiciones, es como un sort pero haciendo lo contrario jajaja
*/
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
    //Agarramos las respuestas del vato
    const userAnswers = Array.isArray(req.body.answers) ? req.body.answers : [];

    // Inicializamos variables
    let score = 0;
    const details = [];

    for (const userAnswer of userAnswers) {
        //Sacamos la pregunta en base a la id de la pool
        const preguntaQuizz = questions.find(q => q.id === userAnswer.id);
        
        // Lo mandamos a volar si puso de que id=25
        if (!preguntaQuizz) continue;

        //Comprobamos
        const isCorrect = userAnswer.answer === preguntaQuizz.correct;

        // Si si lo hizo bien le aumentamos el score
        if (isCorrect) score++;

        //Agregamos las cosas al JSON
        details.push({
            id: preguntaQuizz.id,
            text: preguntaQuizz.text,
            yourAnswer: userAnswer.answer,
            correctAnswer: preguntaQuizz.correct,
            correct: isCorrect
        });
    }

    //Imprimimos toda la evaluacion
    console.log(details);

    // Enviamos todo
    return res.status(200).json({
        message: "Respuestas evaluadas.",
        score: score,
        total: 8,
        details
    });
}

module.exports = { startQuiz, submitAnswers}