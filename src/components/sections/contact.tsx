"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { motion } from "framer-motion";
import { Mail, Clock, Send, CheckCircle2 } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email us",
    description: "Contact us anytime",
    action: "hello@musique.com",
    link: "mailto:hello@musique.com"
  }
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "custom-song",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    console.log('Submitting form with data:', formState); // Debug log

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          project_type: formState.projectType,
          message: formState.message,
        }),
      });

      const data = await response.json();
      console.log('Response from server:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit message');
      }

      setIsSuccess(true);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormState({
        name: "",
        email: "",
        projectType: "custom-song",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err); // Debug log
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-white to-rose-50" id="contact">
      <div className="absolute inset-0 bg-grid-neutral-100/25 bg-grid-8 [mask-image:linear-gradient(to_bottom,white,transparent,white)]" />
      
      <div className="container relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to create your custom song? Tell us about your vision and we'll bring it to life.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-rose-500/5 space-y-6">
              <div className="flex items-center gap-3 text-gray-600 mb-6 bg-rose-50/50 p-4 rounded-lg">
                <Mail className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>Contact us at <a href="mailto:hello@musique.com" className="text-rose-600 hover:text-rose-700 underline">hello@musique.com</a></span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
                  Project Type
                </label>
                <Select
                  name="projectType"
                  value={formState.projectType}
                  onValueChange={(value) => setFormState(prev => ({ ...prev, projectType: value }))}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Project Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom-song">Custom Song</SelectItem>
                    <SelectItem value="cover-song">Cover Song</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Vision
                </label>
                <Textarea
                  name="message"
                  placeholder="Tell us about your vision...
• What's the occasion or purpose?
• Any specific style or mood in mind?
• Special elements you'd like to include?"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  disabled={isSubmitting}
                  className="min-h-[150px]"
                />
              </div>

              <div className="pt-2">
                {error && (
                  <div className="mb-4 p-4 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>

                <div className="text-center mt-4">
                  <a 
                    href="mailto:hello@musique.com"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-600 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Or email us directly at hello@musique.com
                  </a>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
