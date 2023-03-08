import "./../../styles/styles.css"
import {SurveyQA} from "./SurveyQA";
import {useState} from "react";
import {ButtonPrimary} from "../../components/PrimaryButton";

export function SurveyPage() {
    let [QAs, setQAs] = useState(mockQAs)
    let [error, setError] = useState(null)

    const cmdSendAnswers = (e) => {
        e.preventDefault()
    }

    return <div className="flex-column survey-container">
        <span className="headline-large">Test Psychologiczny</span>
        <span className="body-medium survey-container-body">Wypełnienie testu jest wymagane, abyśmy mogli dobrać Partnera.</span>
        <div className="flex-column survey-qas-container">
            {
                QAs.map((QA, index) =>
                    <SurveyQA key={QA.question} question={QA.question} answers={QA.answers}
                              selectedAnswer={QA.selectedAnswer}
                              onAnswerChange={(answer) => setQAs(QAs.map(((qa, qaIndex) => qaIndex === index ? {
                                  ...qa,
                                  selectedAnswer: answer
                              } : qa)))}/>
                )
            }
            {error != null && <span className="label-medium error-span survey-error-span">{error}</span>}
            <div className="flex-wrap">
                <ButtonPrimary text={"Prześlij Odpowiedzi"} onClick={cmdSendAnswers}/>
            </div>
        </div>
    </div>
}

const mockQAs = [
    {
        question: "1. Question",
        answers: [
            "A", "B", "C"
        ],
    },
    {
        question: "2. Question",
        answers: [
            "A", "B", "C"
        ],
    },
    {
        question: "3. Question",
        answers: [
            "A", "B", "C"
        ],
    },
    {
        question: "4. Question",
        answers: [
            "A", "B", "C"
        ],
    },
    {
        question: "5. Question",
        answers: [
            "A", "B", "C"
        ],
    },
]