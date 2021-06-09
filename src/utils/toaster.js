import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './toaster.css';

toast.configure(1000);
export const notifyOk = (message) => toast.success(message);
export const notifyError = (message) => toast.error(message);

const url = 'https://script.google.com/macros/s/AKfycbzavRlnF9q2Uqdp8mUUPUG6lDn-W8Dx3Vm9-ORSEXYYdGD9ve1HqEmRMY7PJ9PeJpYL0w';
export const api = axios.create({
    baseURL: url,
});

export const ngnStates = [
'Abuja',
'Abia',
'Adamawa',
'Akwa Ibom',
'Anambra',
'Bauchi',
'Bayelsa',
'Benue',
'Borno',
'Cross River',
'Delta',
'Ebonyi',
'Edo',
'Ekiti',
'Enugu',
'Gombe',
'Imo',
'Jigawa',
'Kaduna',
'Kano',
'Katsina',
'Kebbi',
'Kogi',
'Kwara',
'Lagos',
'Nassarawa',
'Niger',
'Ogun',
'Ondo',
'Osun',
'Oyo',
'Plateau',
'Rivers',
'Sokoto',
'Taraba',
'Yobe',
'Zamfara',
]