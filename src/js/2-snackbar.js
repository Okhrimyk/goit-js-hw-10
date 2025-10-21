import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

console.log("test");
const input = document.querySelector('input[name="delay"]');
const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const delay = Number(input.value);
    const stateInput = document.querySelector('input[name="state"]:checked');

    if (!stateInput) {
        iziToast.show({
            message: 'Please select a state (Fulfilled or Rejected)',
            color: 'red',
            position: 'topRight',
        });
        return;
    }
    const shouldResolve = stateInput.value === 'fulfilled';
    if (isNaN(delay) || delay <= 0) {
        iziToast.show({
            title: '',
            message: 'Please enter a valid delay',
            color: 'red',
            position: 'topRight',
        });
        return;
    }
    console.log('Delay:', delay, 'Should resolve:', shouldResolve);
    createPromise(delay, shouldResolve)
        .then(result => console.log(result))
      .catch (error => console.log(error));
});

function createPromise(delay, shouldResolve) {
    return new Promise((resolve, reject) => {
           setTimeout(() => {
               if (shouldResolve) {
                   iziToast.success({
                       message: `✅ Fulfilled promise in ${delay}ms`,
                       position: 'topRight',
                   });          
                   resolve(`✅ Fulfilled promise in ${delay}ms`);
              }
                else {
                   iziToast.error({
                       message: `❌ Rejected promise in ${delay}ms`,
                       position: 'topRight',
                   });
                   reject(`❌ Rejected promise in ${delay}ms`);
               }   
              }, delay);
           });
       }