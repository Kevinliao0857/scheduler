import React from "react";
import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
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

    transition(SAVING, true)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  function deleting() {
    transition(CONFIRM)
  }

  function confirmDelete() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
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
          onEdit={() => transition(EDIT)}
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

    {mode === EDIT && (
      <Form
        interviewer={props.interview.interviewer} 
        //Question for AR Should I use {props.interview.interviewer.id}
        interviewers={props.interviewers}
        name={props.interview.student}
        onCancel={back}
        onSave={save}
      />
    )}


    {mode === ERROR_SAVE && (
      <Error
        message={"SOMETHINGS WRONG!!! ITS NOT SAVING!!!!!"}
        onClose={back}
      />
    )}

    {mode === ERROR_DELETE && (
      <Error
        message={"SOMETHINGS WRONG!!! ITS NOT DELETING!!!!!"}
        onClose={back}
      />
    )}

    </article>
  );
}
