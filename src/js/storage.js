import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function getFromLS(key) {
  try {
    const jsonData = localStorage.getItem(key);
    return jsonData ? JSON.parse(jsonData) : null;
  } catch {
    iziToast.error({
      message: `Error during loading from LS for key "${key}": ${err}`,
    });
    return null;
  }
}

export function saveToLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`SaveToLS error: ${err}`);
  }
}

export function removeFromLS(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Error while deleting from LS:', err);
  }
}

// //Взяти з localstorage
// export function getFromLS(key, defaultValue = null) {
//   try {
//     /* if (typeof window === 'undefined' || !localStorage) {
//       return defaultValue;
//     } */

//     const raw = localStorage.getItem(key);
//     if (raw === null) return defaultValue;

//     try {
//       return JSON.parse(raw);
//     } catch {
//       return raw;
//     }
//   } catch (err) {
//     iziToast.error({ message: `getFromLS error for key "${key}": ${err}` });

//     /* if (process.env.NODE_ENV !== 'production') {
//       console.error(`getFromLS error for key "${key}":`, err);
//     } */

//     return null;
//   }
// }

// //Додати до localstorage
// export function saveToLS(key, value) {
//   try {
//     if (/* typeof window === 'undefined' || */ !localStorage) return;

//     const data =
//       /* typeof value === 'string' ? value : */ JSON.stringify(value);

//     localStorage.setItem(key, data);
//   } catch (err) {
//     iziToast.error({ message: `setToLS error for key "${key}": ${err}` });

//     /*  if (process.env.NODE_ENV !== 'production') {
//       console.error(`setToLS error for key "${key}":`, err);
//     } */
//   }
// }

// //Видалити з localstorage
// export function removeFromLS(key) {
//   try {
//     if (/* typeof window === 'undefined' || */ !localStorage) return;
//     localStorage.removeItem(key);
//   } catch (err) {
//     iziToast.error({ message: `removeFromLS error for key "${key}": ${err}` });

//     /* if (process.env.NODE_ENV !== 'production') {
//       console.error(`removeFromLS error for key "${key}":`, err);
//     } */
//   }
// }

// //Почистити localstorage
// export function clearLS() {
//   try {
//     if (/* typeof window === 'undefined' || */ !localStorage) return;
//     window.localStorage.clear();
//   } catch (err) {
//     iziToast.error({
//       message: `clearLS error: ${err}`,
//     });

//     /*   if (process.env.NODE_ENV !== 'production') {
//       console.error('clearLS error:', err);
//     } */
//   }
// }

//=============================================
//Version after previous blended lesson:
