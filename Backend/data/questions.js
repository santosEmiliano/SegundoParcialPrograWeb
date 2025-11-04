module.exports = [
    {
        id: 0,
        text: "¿Cuál es la principal responsabilidad de React en una aplicación web?",
        options: ["Construir y generar la interfaz del usuario (UI).", "Definir los estilos y el diseño visual de la página.", "Gestionar las peticiones de red y autenticación.", "Manejar la lógica del servidor y la base de datos."],
        correct: "Construir y generar la interfaz del usuario (UI)"
    },
    {
        id: 1,
        text: "¿Qué es JSX?",
        options: ["La API oficial de React para manejar el estado.", "Una versión más rápida de JavaScript creada por Facebook.", "Un lenguaje de plantillas del lado del servidor similar a PHP.", "Una extensión que permite escribir estructuras similares de HTML dentro de tu código JavaScript."],
        correct: "Una extensión que permite escribir estructuras similares de HTML dentro de tu código JavaScript."
    },
    {
        id: 2,
        text: "En React, ¿cómo se pasan datos de un componente padre a un componente hijo?",
        options: ["Usando la API de Context.", "Importando el componente hijo directamente.", "Mediante propiedades (props).", "A través del estado (state)."],
        correct: "Mediante propiedades (props)."
    },
    {
        id: 3,
        text: "¿Qué es el 'estado' (state) en un componente de React?",
        options: ["Información interna de un componente que puede cambiar y afecta su renderizado.", "Una variable global disponible para toda la aplicación.", "Datos que solo pueden ser modificados por el componente padre.", "Un objeto que contiene todos los props recibidos."],
        correct: "Información interna de un componente que puede cambiar y afecta su renderizado."
    },
    {
        id: 4,
        text: "¿Para qué se usa el Hook useEffect en un componente funcional?",
        options: ["Para manejar clics y otros eventos del usuario.", "Para realizar efectos secundarios, como peticiones a APIs o suscripciones.", "Para declarar una variable de estado.", "Para devolver el JSX que se debe renderizar."],
        correct: "Para realizar efectos secundarios, como peticiones a APIs o suscripciones."
    },
    {
        id: 5,
        text: "Al renderizar una lista de elementos, ¿por qué es importante usar el prop key?",
        options: ["Para aplicar un estilo CSS único a cada elemento.", "Es un requisito de seguridad para prevenir ataques XSS.", "Para definir el orden en que se mostrarán los elementos.", "Para que React pueda identificar qué elementos cambiaron, se agregaron o eliminaron."],
        correct: "Para que React pueda identificar qué elementos cambiaron, se agregaron o eliminaron."
    },
    {
        id: 6,
        text: "¿Cuál es la diferencia principal entre un componente de clase y un componente funcional?",
        options: ["Los componentes de clase son más rápidos que los funcionales.", "Los funcionales son funciones de JS y los de clase son clases de ES6.", "Solo los componentes de clase pueden usar estado y ciclo de vida.", "Solo los componentes funcionales pueden recibir props."],
        correct: "Los funcionales son funciones de JS y los de clase son clases de ES6."
    },
    {
        id: 7,
        text: "¿Qué herramienta se usa comúnmente para manejar el enrutamiento (routing) en una aplicación React?",
        options: ["React-DOM", "Fetch API", "React-Router", "React-Redux"],
        correct: "React-Router"
    },
    {
        id: 8,
        text: "¿Qué significa que el flujo de datos en React es 'unidireccional'?",
        options: ["Los datos solo pueden fluir del servidor al cliente.", "Los componentes hijos pueden modificar directamente el estado de los componentes padres.", "El estado solo se puede actualizar una vez por renderizado.", "Los datos (props) fluyen hacia abajo, de padres a hijos, y no al revés."],
        correct: "Los datos (props) fluyen hacia abajo, de padres a hijos, y no al revés."
    },
    {
        id: 9,
        text: "¿Qué hace el Hook useState?",
        options: ["Optimiza el rendimiento memorizando una función.", "Permite a un componente funcional tener su propio estado local.", "Ejecuta un efecto secundario después del renderizado.", "Accede al estado global de la aplicación (Context)."],
        correct: "Permite a un componente funcional tener su propio estado local."
    },
    {
        id: 10,
        text: "Si quieres mostrar un componente Bienvenida si el usuario está logueado, y Login si no lo está, ¿qué concepto de React usarías?",
        options: ["Renderizado condicional.", "Props.", "Manejo de estado.", "Enrutamiento (Routing)."],
        correct: "Renderizado condicional."
    },
    {
        id: 11,
        text: "¿Qué problema soluciona la API de Context en React?",
        options: ["El manejo de formularios de manera eficiente.", "La necesidad de hacer peticiones HTTP a un servidor.", "Evitar pasar props manualmente a través de muchos niveles de componentes.", "La lentitud del DOM real al actualizarse."],
        correct: "Evitar pasar props manualmente a través de muchos niveles de componentes."
    },
    {
        id: 12,
        text: "¿Qué es 'prop-drilling'?",
        options: ["Cuando un componente hijo modifica las props de su padre.", "Una técnica de optimización para cargar props más rápido.", "Usar la API de Context para manejar el estado global.", "El proceso de pasar props desde un componente padre a un componente nieto (o más abajo) a través de componentes intermedios."],
        correct: "El proceso de pasar props desde un componente padre a un componente nieto (o más abajo) a través de componentes intermedios."
    },
    {
        id: 13,
        text: "¿Qué hace la herramienta 'Create React App' (CRA)?",
        options: ["La biblioteca oficial de React para manejar el estado.", "Proporciona una configuración inicial completa para una aplicación React sin necesidad de configurar Webpack o Babel manualmente.", "Un editor de código (IDE) optimizado para React.", "Es una biblioteca de componentes de UI pre-diseñados."],
        correct: "Proporciona una configuración inicial completa para una aplicación React sin necesidad de configurar Webpack o Babel manualmente."
    },
    {
        id: 14,
        text: "En JSX, si quieres escribir un comentario, ¿cómo lo haces?",
        options: ["{/* Esto es un comentario */}", "// Esto es un comentario", "/* Esto es un comentario */", "# Esto es un comentario"],
        correct: "{/* Esto es un comentario */}"
    },
    {
        id: 15,
        text: "En React, ¿qué es un 'Hook'?",
        options: ["Funciones especiales que te permiten 'engancharte' a las características de React (como el estado) desde componentes funcionales.", "Un patrón de diseño para compartir código entre componentes.", "Un tipo de componente de clase obsoleto.", "Un evento especial del navegador, como onClick."],
        correct: "Funciones especiales que te permiten 'engancharte' a las características de React (como el estado) desde componentes funcionales."
    }
];