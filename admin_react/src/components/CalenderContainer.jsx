<<<<<<< HEAD
import { Portal } from "react-overlays";


const CalendarContainer = ({ children }) => {
  const el = document.getElementById("calendar-portal");

  return (
    <Portal container={el}>
      {children}
    </Portal>
  );
};

=======
import { Portal } from "react-overlays";


const CalendarContainer = ({ children }) => {
  const el = document.getElementById("calendar-portal");

  return (
    <Portal container={el}>
      {children}
    </Portal>
  );
};

>>>>>>> d9c85bf62bb727feba0d3c463ce39bcb2f3ca3c9
export default CalendarContainer;