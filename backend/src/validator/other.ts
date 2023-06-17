export const isValidEmail = (email: string | undefined | null): boolean => {
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const isValidDate = (date: string | Date | undefined | null): boolean => {
  if (!date) return false
  if (typeof date == 'string') {
    let [y,m,d ] = date.split("-")
    if (Number(m) < 10) m = `0${m}`
    if (Number(d) < 10) d = `0${d}`
    date = `${y}-${m}-${d}`
  }
  const dateObject = new Date(date);
  return !isNaN(dateObject.getTime()) && dateObject.toISOString().slice(0, 10) === date.toString();
}

export const isValidPhoneNumber = (phone: string | undefined | null): boolean => {
  if (!phone) return false
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone)
}