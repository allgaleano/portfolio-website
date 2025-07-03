import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "./ui/alert";

const LAMBDA_URL = import.meta.env.PUBLIC_LAMBDA_URL;

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
    unexpectedError: string;
    invalidFormat: string;
    successMessage?: string;
  };
  lang: 'en' | 'es';
}


export default function ContactForm({ translations, lang }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorDetails, setErrorDetails] = useState<string>('');
  
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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setSubmitStatus('idle');
    setErrorDetails('');

    try {

      const response = await fetch(LAMBDA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          lang
        })
      });

      if (response.ok) {
        form.reset(); 
        setSubmitStatus('success');
      } else if(response.status === 400) {
        setSubmitStatus('error');
        setErrorDetails(translations.invalidFormat);
      } else {
        setSubmitStatus('error');
        setErrorDetails(translations.unexpectedError);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus('error');
      setErrorDetails(translations.unexpectedError);
    } finally {
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
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
          {submitStatus === 'success' && (
            <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                {translations.successMessage}
              </AlertDescription>
            </Alert>
          )}
          {submitStatus === 'error' && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/60">
              <CheckCircle2 className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                {errorDetails}
              </AlertDescription>
            </Alert>
          )}
          <Button variant="outline" className="self-end" disabled={submitting} type="submit">
            {submitting ? (
              <span className="flex items-center gap-2">
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
