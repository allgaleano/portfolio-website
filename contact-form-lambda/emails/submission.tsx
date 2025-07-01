import { Body, Container, Head, Heading, Html, Preview, Tailwind, Text } from "@react-email/components";

interface EmailProps {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default function Submission({
  name,
  email,
  phone,
  subject,
  message,
} : EmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto px-2 font-sans">
          <Preview>albertogaleano.com form submission by {name}</Preview>
          <Container className="mx-auto my-[40px] max-w-[450px] rounded border border-solid border-[#eaeaea] p-6">
            <Heading className = "mx-0 my-[30px] p-0 text-center font-normal text-[22px] text-black">
              Form submission from <strong>{name}</strong>
            </Heading>
            <Text className="text-[16px] text-gray-800">
              <strong>Email:</strong> {email}
            </Text>
            {phone && (
              <Text className="text-[16px] text-gray-800">
                <strong>Phone:</strong> {phone}
              </Text>
            )}
            <Text className="text-[16px] text-gray-800">
              <strong>Subject:</strong> {subject}
            </Text>
            <Text className="text-[16px] text-gray-800">
              <strong>Message:</strong>
              <br />
              <span className="text-[16px] text-gray-800">
                {message}
              </span>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}