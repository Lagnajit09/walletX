export const validatePhone = (phone: string) => {
  // Check if empty
  if (!phone) {
    return { ok: false, message: "Phone number is required!" };
  }

  // Check length
  if (phone.length !== 10) {
    return { ok: false, message: "Phone number must be exactly 10 digits!" };
  }

  // Check if contains only digits
  if (!/^\d+$/.test(phone)) {
    return { ok: false, message: "Phone number can only contain digits!" };
  }

  // Optional: Check if all digits are same (like 0000000000)
  if (/^(\d)\1{9}$/.test(phone)) {
    return { ok: false, message: "Invalid phone number!" };
  }

  return { ok: true, message: "Success!" };
};
