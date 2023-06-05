import "./../../styles/styles.css"
import {SurveyQA} from "./SurveyQA";
import {useContext, useEffect, useState} from "react";
import {ButtonPrimary} from "../../components/ButtonPrimary";
import {authContext} from "../auth/auth";
import {GetSurveyQuestionsRequest} from "./GetSurveyQuestionsRequest";
import {PostSurveyRequest} from "./PostSurveyRequest";
import {Navigate} from "react-router-dom";

export function SurveyPage() {
    let [QAs, setQAs] = useState([])
    let [success, setSuccess] = useState(false)
    let [error, setError] = useState(null)
    const {authState} = useContext(authContext)

    useEffect(() => {
        GetSurveyQuestionsRequest(authState.jwt, setQAs, setError)
    }, [])

    const cmdSendAnswers = (e) => {
        e.preventDefault()
        PostSurveyRequest(authState.jwt, {
                answers: QAs.map(obj => ({
                    questionNumber: obj.questionNumber,
                    answer: obj.selectedAnswer
                }))
            },
            () => {
                setSuccess(true)
            },
            setError)
    }

    return <div className="flex-column survey-container">
        {success && <Navigate to={"/profile"}/>}
        <span className="headline-large">Test Psychologiczny</span>
        <span className="body-medium survey-container-body">Wypełnienie testu jest wymagane, abyśmy mogli dobrać Partnera.</span>
        {
            QAs.map((QA, index) =>
                <SurveyQA key={QA.questionNumber} question={QA.questionText} answers={[1, 2, 3, 4, 5]}
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
}
