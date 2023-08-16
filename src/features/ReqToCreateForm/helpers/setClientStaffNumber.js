export default function setClientStaffNumber(staff, staffList, formData, phoneField) {
  if (!staff) return;
  const staffData = staffList.find((el) => (el.id === staff));
  formData[phoneField] = staffData.number;
}
