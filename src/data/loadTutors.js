import tutors from "./tutors.json";

export function loadTutors() {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (!Array.isArray(tutors)) {
        reject(new Error("Mentor data could not be loaded."));
        return;
      }
      resolve(tutors);
    }, 350);
  });
}