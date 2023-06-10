import "./../../styles/styles.css"

export function SurveyQA({question, answers, selectedAnswer, onAnswerChange}) {
    return <div className="flex-column survey-qas-container">
        <span className="headline-large survey-question">{question}</span>
        <div className="flex-row survey-radio-button">
            <span className="title-medium">Ani trochę</span>
            {answers.map((answer, index) =>
                <input
                    className={index % 4 === 0 ? "survey-radio-button-large" : index === 1 || index === 3 ? "survey-radio-button-small" : "survey-radio-button-medium"}
                    type="radio" value={answer}
                    checked={selectedAnswer === answer}
                    onChange={e => onAnswerChange(answer)}/>
            )
            }
            <span className="title-medium">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bardzo</span>
        </div>
    </div>
}