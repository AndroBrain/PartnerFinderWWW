import "./../../styles/styles.css"

export function SurveyQA({question, answers, selectedAnswer, onAnswerChange}) {
    return <div className="flex-column">
        <span className="title-large survey-question">{question}</span>
        <div className="flex-column survey-radio-button">
            {answers.map(answer =>
                <label className="label-medium survey-radio-button">
                    <input type="radio" value={answer} checked={selectedAnswer === answer}
                           onChange={e => onAnswerChange(answer)}/>
                    {answer}
                </label>
            )
            }
        </div>
    </div>
}