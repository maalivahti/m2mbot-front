export default function setClientAddressInfo(address, addressList, formData) {
  if (!address) return;
  const addressData = addressList.find((el) => (el.id === address));
  formData.clientAddress = addressData.address;
  formData.placeBoxWram = addressData.warm_box;
  formData.placeBoxElectric = addressData.electricity;
}
