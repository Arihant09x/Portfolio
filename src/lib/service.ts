import emailjs from "@emailjs/browser";
export default async function sendEmail(data) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    message: data.message,
    to_email: "arihantc677@gmail.com",
  };

  await emailjs.send(serviceId, templateId, templateParams, publicKey);
}
