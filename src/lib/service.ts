import emailjs from "@emailjs/browser";
export default async function sendEmail(data) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  console.log("All env vars", { serviceId, templateId, publicKey });

  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    message: data.message,
    to_email: "arihantc677@gmail.com",
  };

  await emailjs.send(serviceId, templateId, templateParams, publicKey);
}
