import React from "react";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back, history } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer

    };
    // console.log(name)
    // console.log(interviewer)

    props.bookInterview(props.id, interview)

    transition(SHOW)
    // console.log("id: ",  props.id)
    // console.log("interview: ",  interview)
  }


  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers} 
        onCancel={back}
        onSave={save}
        />
        )}



    </article>
  );
}
