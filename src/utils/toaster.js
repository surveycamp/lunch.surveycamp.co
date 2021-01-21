import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toaster.css';

toast.configure(1000);
export const notifyOk = (message) => toast.success(message);
export const notifyError = (message) => toast.error(message);