import type { TranslationKey } from "@/i18n/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader, LoaderCircle } from "lucide-react";

interface ContactFormProps {
  translations: {
    nameRequired: string;
    invalidEmail: string;
    subjectRequired: string;
    messageRequired: string;
    labels: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    };
    submitting: string;
    submit: string;
  };
}

export default function ContactForm({ translations }: ContactFormProps) {
  
  const formSchema = z.object({
    name: z.string().min(1, translations.nameRequired),
    email: z.string().email(translations.invalidEmail),
    phone: z.string().optional(),
    subject: z.string().min(1, translations.subjectRequired),
    message: z.string().min(1, translations.messageRequired),
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

  const submitting = form.formState.isSubmitting;

  return (
    <div className="p-8 bg-background border rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField 
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 h-6">
                  <FormLabel className="whitespace-nowrap">{translations.labels.name}</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input {...field} disabled={submitting} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField 
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center gap-2 h-6">
                    <FormLabel className="whitespace-nowrap">{translations.labels.email}</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input {...field} disabled={submitting} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center gap-2 h-6">
                    <FormLabel className="whitespace-nowrap">{translations.labels.phone}</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input {...field} disabled={submitting} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField 
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 h-6">
                  <FormLabel className="whitespace-nowrap">{translations.labels.subject}</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input {...field} disabled={submitting} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 h-6">
                  <FormLabel className="whitespace-nowrap">{translations.labels.message}</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Textarea {...field} disabled={submitting} className="min-h-24"/>
                </FormControl>
              </FormItem>
            )}
          />
          <Button variant="outline" className="self-end" disabled={submitting} type="submit">
            {submitting ? (
              <span>
                <LoaderCircle className="animate-spin"/>
                {translations.submitting}
              </span>
            ) : (
              <span>
                {translations.submit}
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
