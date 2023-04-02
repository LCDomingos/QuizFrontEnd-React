import React, { useState } from 'react';


export default function QuizFrontEnd() {
    // Array criado de objetos
    const questions = [
        {
            // Texto da pergunta
            questionText: 'O que é Front-end?',
            // Array de outros objetos, cada alternativa tem uma propriedade que será true ou false
            answerOptions: [
                { answerText: 'Parte de um sistema que é oculta para o usuário', isCorrect: false },
                { answerText: 'Parte de um sistema é visível e interativa ao usuário', isCorrect: true },
                { answerText: 'Parte lógica que recebe as regras de negócio', isCorrect: false },
                { answerText: 'Nenhuma das alternativas anteriores', isCorrect: false },
            ],
        },
        {
            questionText: 'O que é React JS?',
            answerOptions: [
                { answerText: 'Uma poderosa biblioteca Java Script', isCorrect: true },
                { answerText: 'Uma linguagem de programação', isCorrect: false },
                { answerText: 'Um servidor de Cloud', isCorrect: false },
                { answerText: 'Todas as respostas anteriores', isCorrect: false },
            ],
        },
        {
            questionText: 'Quais são as principais tecnologias do mundo Front-End?',
            answerOptions: [
                { answerText: 'Java, Golang e Python', isCorrect: false },
                { answerText: 'AWS, Google Cloud e Azure', isCorrect: false },
                { answerText: 'Kotlin, HTML e CSS', isCorrect: false },
                { answerText: 'HTML, CSS e JavaScript', isCorrect: true },
            ],
        },
    ];

    // Criando os objetos de estado
    // currenteQuestion controla qual questão o usuário está
    const [currenteQuestion, setCurrentQuestion] = useState(0);
    // showScore controla se o jogo ja acabou ou não
    const [showScore, setShowScore] = useState(false);
    // showScore controla o placar final
    const [score, setScore] = useState(0);

    const [showAnswers, setShowAnswers] = useState(false);

    //Funcção handleAnswerButtonClick é basicamente tudo que acontecerá assim que se clica no botão
    const handleAnswerButtonClick = (isCorrect) => {
      // vendo se está verdadeiro ou false, se for verdadeiro soma 1 ponto
      if(isCorrect){
        setScore(score+1);

      }
      // Apenas pulando as questões, se estiver na 0 vai para a 1 se estiver na 1 vai p 2... Isso acontecerá enquanto o next question for menos que o tamanho do array questions
      const nextQuestion = currenteQuestion + 1;
      if (nextQuestion < questions.length){
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
        setShowAnswers(true);
      }

    }


    // -------------------------------------------------------------------------------------------------------
    // Função para reiniciar o quiz
    const restartQuiz = () => {
    // Reinicia a pergunta e o score e o showAnwers
    setCurrentQuestion(0);
    setShowScore(false);
    setShowAnswers(false);
    setScore(0);
    };

    // -------------------------------------------------------------------------------------------------------------





    return (
        <div className='QuizFrontEnd'>
            {/* Aqui vamos mostrar o resultado final */}
            {/* quando o atributo do showScore for true vai ser rodado essa tela que mostra o resultado final */}
            {showScore ? (
              <>
                <div className='score-section'>Você acertou {score} questão de {questions.length}.</div> 
                
                <div className="answers">
                  <p>Todas as respostas corretas:</p>
                  <ul>
                    {questions.map((question, index) => (
                      <li key={index}>
                        <span>{question.questionText}</span>
                        {showAnswers && (
                          <span>Resposta: {question.answerOptions.find((option) => option.isCorrect).answerText}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                <button className="restart" onClick={restartQuiz}>Reiniciar quiz</button>
                </div>  
              </>      
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            {/* Vamos colocar o array da questão atual + 1 para poder vizualmente ficar bonito, array 0 será 1, o 1 será 2 e assim por diante */}
                            <span>Question {currenteQuestion+1}</span>/{questions.length}
                        </div>
                        {/* //Pegando a questão de dentro do Array questions, que está na posição atual currentQuestion. */}
                        <div className='question-text'>{questions[currenteQuestion].questionText}</div>
                    </div>
                    {/* Aqui usaremos uma função "map" para poder percorrer as respostas de cada determinada pergunta e assim saber se é true ou false*/}
                    {/* Aqui no onclick colocamos o handleButtonClick para toda vez que clicar na resposta, esteja ela certa ou errada ele vai para a proxima. */}
                    <div className='answer-section'>
                      {questions[currenteQuestion].answerOptions.map((answerOption, index) => (
                      <button onClick={()=>handleAnswerButtonClick(answerOption.isCorrect)}>{answerOption.answerText}</button>))}
                    </div>
                </>
            )}
        </div>
    );
}


