import type { TranslationKey } from "@/i18n/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface ContactFormProps {
  t: (key: TranslationKey) => string;
}


export default function ContactForm({ t } : ContactFormProps) {
  
  const formSchema = z.object({
    name: z.string().min(1, t('contact.nameRequired')),
    email: z.string().email(t('contact.invalidEmail')),
    phone: z.string().optional(),
    subject: z.string().min(1, t('contact.subjectRequired')),
    message: z.string().min(1, t('contact.messageRequired')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Handle form submission logic here
    console.log("Form submitted:", data);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField 
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contact.form.name')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contact.form.email')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        
      </Form>
    </div>
  )
}
