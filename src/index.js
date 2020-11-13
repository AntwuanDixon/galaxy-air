import _ from 'lodash';
import datepicker from 'js-datepicker'
const flightType = document.querySelector('#flight-type');
const departDate = document.querySelector('.start');
const returnDate = document.querySelector('.end');
const bookBtn = document.querySelector('#book-btn');
toggleReturnInput();

flightType.addEventListener('change', () => {
  toggleReturnInput();
})

function checkDate(element, date) {
  let d = new Date();
  if (d > date) {
    element.style.backgroundColor = "#e60000";
  } else {
    element.style.backgroundColor = "rgb(63, 63, 63)";
  }
};

function toggleReturnInput() {
  let opt;
  for (let i = 0; i < flightType.options.length; i++) {
      opt = flightType.options[i];
      if (opt.selected === true) {
          break;
      }
  }
  if (opt.value === 'one-way') {
      returnDate.disabled = true;
  } else {
      returnDate.disabled = false;
  }
}

function isValidDate(date) {
  let d = new Date();
  if (Object.prototype.toString.call(date) === "[object Date]") {
    console.log('it is a date');
    if (isNaN(d.getTime())) {  // d.valueOf() could also work
      console.log('date is not valid');
    } else {
      console.log('date is valid');
    }
  } else {
    console.log('not a date');
  }
}

bookBtn.addEventListener('click', () => {
  function makeFlightMessage() {
      let startDate = start.getRange().start.getDate();
      let flightTypePure = flightType.options[flightType.selectedIndex].text.toLowerCase();
      if (flightTypePure === 'one way') {
        let flightMessage = "You have booked a " + flightTypePure + " flight on " + departDate.value +'.';
        return flightMessage;
      } else if (flightTypePure === 'round trip') {
        let endDate = start.getRange().end.getDate();
        let tripLength = endDate - startDate;
        let flightMessage = "You have booked a " + flightTypePure + " flight from " + departDate.value + ' to ' + returnDate.value + '.' + " Your trip is " + tripLength + " days long";
        return flightMessage;
      }
  }
  alert(makeFlightMessage())
});

const start = datepicker('.start', { id: 1,
  onSelect: (instance, date) => {
    checkDate(departDate, date);
    isValidDate(date);
    console.log(start.getRange())
    }
  });

const end = datepicker('.end', { id: 1,
  onSelect: (instance, date) => {
    checkDate(returnDate, date);
    isValidDate(date);
    console.log(end.getRange())
    } 
  });
