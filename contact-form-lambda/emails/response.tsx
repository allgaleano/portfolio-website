import { Body, Container, Head, Heading, Html, Preview, Tailwind, Text } from "@react-email/components";

const text = {
  en : {
    preview: "Your email has reached my inbox! I will get back to you as soon as possible.",
    title: "Thank you for your message",
    body: "Your message has been received successfully and I will get back to you soon at this email: ",
    phoneAlternative: "or at this phone number: "
  },
  es: {
    preview: "¡Tu email ha llegado correctamente! Me pondré en contacto contigo lo antes posible.",
    title: "¡Gracias por tu mensaje",
    body: "Tu mensaje ha sido recibido correctamente y pronto me pondré en contacto contigo a través de este email: ",
    phoneAlternative: "o a través de este número de teléfono: "
  }
}

interface EmailProps {
  name: string;
  email: string;
  phone?: string;
  lang: "en" | "es";
}

export default function Response({
  name,
  email,
  phone,
  lang = "en"
} : EmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto px-2 font-sans">
          <Preview>{text[lang].preview}</Preview>
          <Container className="mx-auto my-[40px] max-w-[450px] rounded border border-solid border-[#eaeaea] p-6" >
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[22px] text-black">
              {text[lang].title} <strong>{name}</strong>!
            </Heading>
            <Text className="text-[16px] text-gray-800">
              {text[lang].body} <strong>{email}</strong> 
              {phone ? (
                <span>
                  {text[lang].phoneAlternative} <strong>{phone}</strong>.
                </span>
              ) : (
                <span>.</span>
              )}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
