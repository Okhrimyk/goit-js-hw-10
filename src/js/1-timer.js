import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let selectedDate = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {selectedDate = selectedDates[0];
      const now = new Date();
    if (selectedDate <= now) {
        iziToast.show({
            title: '',
            message: 'Please choose a date in the future',
            color: 'red',
        });
        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }   
  },
};

const calendar = flatpickr('#datetime-picker', {
  dateFormat: 'Y-m-d',
    // minDate: 'today',
    ...options,
});

input.addEventListener('change', (event) => {
    selectedDate = new Date(event.target.value);
    console.log('selectedDate', selectedDate);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', () => { 
  startBtn.disabled = true;
  input.disabled = true;
  calendar.set("clickOpens", false);

  const intervalId = setInterval(() => {
    const now = new Date();
    const delta = selectedDate - now;
    
      if (delta <= 0) {
          clearInterval(intervalId);
          input.disabled = false;
          calendar.set("clickOpens", true);
          startBtn.disabled = true;
        return;
        }
        const time = convertMs(delta);
        daysSpan.textContent = String(time.days).padStart(2, '0');
        hoursSpan.textContent = String(time.hours).padStart(2, '0');
        minutesSpan.textContent = String(time.minutes).padStart(2, '0');
        secondsSpan.textContent = String(time.seconds).padStart(2, '0');
        startBtn.disabled = true;  
    }, 1000)
},)
