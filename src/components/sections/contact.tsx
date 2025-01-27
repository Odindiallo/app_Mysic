"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Send,
  Music2,
  Calendar,
  CheckCircle2
} from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Call us",
    description: "Mon-Fri from 8am to 5pm.",
    action: "+1 (555) 000-0000",
    link: "tel:+15550000000"
  },
  {
    icon: Mail,
    title: "Email us",
    description: "We'll respond within 24h",
    action: "hello@musique.com",
    link: "mailto:hello@musique.com"
  },
  {
    icon: MessageSquare,
    title: "Live chat",
    description: "24/7 Available",
    action: "Start chat",
    link: "#chat"
  }
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "custom-song",
    timeline: "not-urgent",
    budget: "standard",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-rose-50" id="contact">
      <div className="absolute inset-0 bg-grid-neutral-100/25 bg-grid-8 [mask-image:linear-gradient(to_bottom,white,transparent,white)]" />
      
      <div className="container relative">
        <div className="text-center mb-16">
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
              Ready to create your custom song? We're here to help bring your musical vision to life.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-rose-500/5">
              <h3 className="text-2xl font-semibold mb-6">Contact Methods</h3>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.link}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-rose-50 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="rounded-lg bg-rose-100 p-3 text-rose-600">
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{method.title}</h4>
                      <p className="text-sm text-gray-500 mb-1">{method.description}</p>
                      <p className="text-rose-600 font-medium">{method.action}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-rose-500/5">
              <h3 className="text-2xl font-semibold mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-rose-500" />
                  <span>Response time: within 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  <span>Available worldwide</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Music2 className="w-5 h-5 text-rose-500" />
                  <span>Professional studio quality</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg shadow-rose-500/5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-colors duration-200"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formState.projectType}
                  onChange={(e) => setFormState(prev => ({ ...prev, projectType: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-colors duration-200"
                >
                  <option value="custom-song">Custom Song</option>
                  <option value="cover-song">Cover Song</option>
                  <option value="instrumental">Instrumental</option>
                  <option value="jingle">Commercial Jingle</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formState.timeline}
                    onChange={(e) => setFormState(prev => ({ ...prev, timeline: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-colors duration-200"
                  >
                    <option value="urgent">Urgent (24-48h)</option>
                    <option value="standard">Standard (3-5 days)</option>
                    <option value="relaxed">Relaxed (1-2 weeks)</option>
                    <option value="not-urgent">Not urgent</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formState.budget}
                    onChange={(e) => setFormState(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-colors duration-200"
                  >
                    <option value="basic">Basic ($299-$499)</option>
                    <option value="standard">Standard ($500-$999)</option>
                    <option value="premium">Premium ($1000-$2499)</option>
                    <option value="custom">Custom Project</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-colors duration-200"
                  placeholder="Tell us about your vision for the song..."
                />
              </div>

              <motion.div
                initial={false}
                animate={isSuccess ? { height: "auto" } : { height: 0 }}
                className="overflow-hidden"
              >
                {isSuccess && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}
              </motion.div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                By submitting this form, you agree to our{" "}
                <a href="/terms" className="text-rose-600 hover:text-rose-700">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-rose-600 hover:text-rose-700">
                  Privacy Policy
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
