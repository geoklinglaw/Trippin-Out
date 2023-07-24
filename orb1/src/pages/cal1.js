import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";
import PropTypes from 'prop-types';
import  useStore  from './authStore';
import { auth } from "../firebase";
import { getDoc, db, firebase } from "../firebase";
import {
    collection,
    query,
    getDocs,
    addDoc,
    doc,
    setDoc,
} from "firebase/firestore";

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



const Calendar = ({propsLoc, propsRoute, propsMatrix, propsFood}) => {
    const tripID = useStore((state) => state.tripId);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    async function fetchDaysFirebase() {
        const userID = auth.currentUser.uid;
        const durationRef = doc(db, "users", userID, "trips", tripID);
        const durationSnap = await getDoc(durationRef);
    
        if (durationSnap.exists()) {
          const duration = durationSnap.data().duration;
          return duration;
        } else {
          console.error("No such document exists!");
        }
    }

    async function fetchDatesFirebase() {
        const userID = auth.currentUser.uid;
        const durationRef = doc(db, "users", userID, "trips", tripID);
        const durationSnap = await getDoc(durationRef);
    
        if (durationSnap.exists()) {
          const accom = durationSnap.data().accommodation[0];
          const startDate = accom.checkInDateTime.toDate();
          const endDate = accom.checkOutDateTime.toDate();
          console.log("START DATE: ", startDate);
            console.log("END DATE: ", endDate);
          return [startDate, endDate];  // Return dates in an array
        } else {
          console.error("No such document exists!");
        }
    }
    
    
    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),  // JavaScript months are 0-based, so we add 1
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    
    Calendar.propTypes = {
        propsLoc: PropTypes.array.isRequired,
        propsRoute: PropTypes.object.isRequired,
    };

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

    function getTravelDuration(originIndex, destinationIndex, distMatrix) {
        const travelDetails = distMatrix.rows[originIndex].elements[destinationIndex];
        return travelDetails.status === 'OK' ? travelDetails.duration.value : 0;
    }

    function roundUpTime(timeInMin) {
        if(timeInMin >= 15 && timeInMin < 45) {
            return 0.5;
        } else if(timeInMin >= 45 && timeInMin < 75) {
            return 1;
        } else {
            return timeInMin / 60; // convert minutes to hours
        }
    }

    useEffect(() => {
        const fetchDates = async () => {
            const dates = await fetchDatesFirebase();
            setStartDate(formatDate(dates[0].toString()));
            setEndDate(formatDate(dates[1].toString()));
        }
        fetchDates();
    }, []);
    
  

  useEffect(() => {
    const events = [];
    console.log("FKING DATES", startDate, endDate);
    if(startDate && endDate) {
        const generateEvents = async () => {
            const numDays = await fetchDaysFirebase();
            const dateArray = generateDates('2023-08-02', '2023-08-03', 2);

            // Loop through the entries of the propsRoute object, providing each entry as an array [key, value]
            // and the index of the entry within the object.
            Object.entries(propsRoute).forEach(([day, routeIndexes], dayIndex) => {

                if (routeIndexes === 0) {
                    console.error('routeIndexes is 0', {day, routeIndexes, dayIndex, propsRoute});  
                    return;
                }
                
                let startHour = 18;  // Reset startHour for each new day

                // Loop through the indexes in routeIndexes for each day
                routeIndexes.forEach((locationIndex, index, self) => {
                    
                if (locationIndex === 0) {  // Skip accommodation
                    return;
                }
            
                let travelDurationInHour = 0;
                if (index < self.length - 1) {
                    const nextLocationIndex = self[index + 1];
                    const travelDuration = getTravelDuration(locationIndex, nextLocationIndex, propsMatrix);
                    console.log(`Travel duration from location ${locationIndex} to ${nextLocationIndex}: ${travelDuration/60} minutes`);
                    travelDurationInHour = roundUpTime(travelDuration / 60);
                    console.log(`Travel duration after rounding ${travelDurationInHour}`)
                    // no need to increase startHour here
                }
                    
                // Use the locationIndex to get the corresponding location from propsLoc
                const adjustedLocationIndex = locationIndex - 1;
                const location = propsLoc[adjustedLocationIndex];
                console.log(locationIndex, location)
                // Use the dayIndex to get the corresponding date from dateArray, and create a new date object
                const start = new Date(dateArray[dayIndex]);
                start.setHours(startHour, 0, 0);
                const end = new Date(start.getTime());
                end.setHours(start.getHours() + location.activity_duration);
                const color = categoryColors.get(location.category);

                if (travelDurationInHour > 0) {
                    // we add travel event after the current event has finished
                    const travelStart = new Date(end.getTime());  // Start time of travel is end time of activity
                    const travelEnd = new Date(travelStart.getTime());
                    travelEnd.setHours(travelStart.getHours() + travelDurationInHour);  // End time is start time + duration
                    events.push({
                        id: `travel-${dayIndex}-${index}`,
                        text: `Travel via Bus/Walk`,
                        start: travelStart.toISOString(),
                        end: travelEnd.toISOString(),
                        backColor: "#D3D3D3"  
                    });
            
                    startHour += travelDurationInHour;  
                    console.log(`aft travelling ${startHour}`);
                }
                console.log(`aft event ${startHour}`);
                
                    events.push({
                        id: `${dayIndex}-${index}`,
                        text: location.name,
                        start: start.toISOString(),
                        end: end.toISOString(),
                        backColor: color  // Color for activity
                    });
                
                    startHour += location.activity_duration;  // Increase startHour by activity duration
                    console.log(`aft event ${startHour}`);
                });
            });

            calendarRef.current.control.update({ startDate: dateArray[0].toISOString(), events });
            generateEvents();
        }
    }
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
