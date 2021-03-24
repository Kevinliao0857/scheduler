import React from "react";

import "components/DayListItem.scss";
const classNames = require("classnames");

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  function formatSpots(spotsOpen) {
    if (spotsOpen === 0) {
      return "no spots remaining";
    } else if (spotsOpen === 1) {
      return "1 spot remaining";
    } else {
      return `${spotsOpen} spots remaining`;
    }
  }

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={dayClass}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
