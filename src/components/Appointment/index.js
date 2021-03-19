import React from "react";
import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"


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

    // console.log("id: ",  props.id)
    // console.log("interview: ",  interview)

    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
    
  }

  function deleting() {
    transition(CONFIRM)


  }

  function confirmDelete() {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleting}
        />
      )}

      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers} 
        onCancel={back}
        onSave={save}
        />
        )}

      {mode === SAVING && (
          <Status
            message={"Saving"}
          />
        )}

      {mode === DELETING && (
          <Status
            message={"Deleting"}
          />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={"Are you SURE you want to DELETE?"}
          onCancel={back}
          onConfirm={confirmDelete}
        />
    )}

    </article>
  );
}
