import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

const Calendar = ({propsLoc, propsRoute}) => {
    console.log(propsLoc);
    console.log(propsRoute);

    const categoryColors = new Map([
        ["10000", "#5186CD"], // red for Exhibitions & Museums
        ["18067", "#CD9251"], // green for Sports and Recreation
        ["10032", "#51CD86"], // blue for Night Life
        ["16020", "#ffff00"], // yellow for Historic & Protected Sites
        ["16000", "#CD5186"], // cyan for Landmark & Outdoors
        ["14003", "#9251CD"],
        ["1000", "#CDDA51"], // magenta for Entertainment Events
        // add more categories as needed
    ]);

    function generateDates(startDate, endDate, numDays) {
        let start = new Date(startDate);
        let end = new Date(endDate);
        let dates = [];

        for (let i = 0; i < numDays; i++) {
          let date = new Date(start);
          date.setDate(start.getDate() + i);
          if (date > end) break; // Stop if we've gone past the end date
          dates.push(date);
        }

        return dates;
    }

    const calendarRef = useRef();
    const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async args => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      });
    },
    eventDeleteHandling: "Update",
    onEventClick: async args => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
      if (!modal.result) { return; }
      const e = args.e;
      e.data.text = modal.result;
      dp.events.update(e);
    },
  });

  useEffect(() => {
    const events = [];
    const dateArray = generateDates('2023-8-02', '2023-8-3', 2);

    // Loop through the entries of the propsRoute object, providing each entry as an array [key, value]
    // and the index of the entry within the object.
    Object.entries(propsRoute).forEach(([day, routeIndexes], dayIndex) => {
        let startHour = 18;  // Reset startHour for each new day

        // Loop through the indexes in routeIndexes for each day
        routeIndexes.forEach((locationIndex, index) => {

        // Use the locationIndex to get the corresponding location from propsLoc
        const location = propsLoc[locationIndex];

        // Use the dayIndex to get the corresponding date from dateArray, and create a new date object
        const start = new Date(dateArray[dayIndex]);

        // Set the hours of the start date object to startHour (a.m.),
        // and the minutes and seconds to 0. This sets the start time for each event.
        start.setHours(startHour, 0, 0);

        // Create a new date object for the end time, identical to the start time.
        const end = new Date(start.getTime());

        // Set the hours of the end date object to one hour later than the start time.
        end.setHours(start.getHours() + location.activity_duration);
        const color = categoryColors.get(location.category.toString());
        startHour += location.activity_duration;

        // Push a new event to the events array, with an id made from the dayIndex and index,
        // the location name as the text, the start and end times, and a background color
        // depending on whether the index is even or odd.
        events.push({
            id: `${dayIndex}-${index}`,
            text: location.name,
            start: start.toISOString(),
            end: end.toISOString(),
            backColor: color // getRandomColor()
        });
        });
    });

    calendarRef.current.control.update({ startDate: dateArray[0].toISOString(), events });
}, [propsLoc, propsRoute]);


  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        {/* <DayPilotNavigator
          selectMode={"Week"}
          showMonths={3}
          skipMonths={3}
          startDate={"2023-10-02"}
          selectionDay={"2023-10-02"}
          onTimeRangeSelected={ args => {
            calendarRef.current.control.update({
              startDate: args.day
            });
          }}
        /> */}
      </div>
      <div style={styles.main}>
        <DayPilotCalendar
          {...calendarConfig}
          ref={calendarRef}
        />
      </div>
    </div>
  );
}

export default Calendar;
