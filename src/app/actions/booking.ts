'use server'

export async function submitBookingForm(formData: FormData) {
  const name = formData.get('name');
  const business = formData.get('business');
  const pumps = formData.get('pumps');
  const phone = formData.get('phone');
  const location = formData.get('location');

  if (!name || !business || !pumps || !phone || !location) {
    return { success: false, error: 'All fields are required.' };
  }

  // Simulate CRM insertion or email dispatch latency
  await new Promise((resolve) => setTimeout(resolve, 800));
  // TODO: Add proper email sending/CRM configuration

  console.log(`[CRM Integration] New booking from ${name} at ${business}, ${location}`);

  return { success: true };
}
