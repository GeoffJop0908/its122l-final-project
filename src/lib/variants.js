export const variants = {
  initial: { opacity: 0, x: 0 },
  error: { opacity: 1, x: [0, 50, -50, 0], transition: { duration: 0.25 } },
  success: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, x: 50 },
};
