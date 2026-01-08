// app/contact/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-neutral-600 mb-8 max-w-md text-center">
        We'd love to hear from you! Reach out to us using the form below or navigate to the contact section.
      </p>

      {/* Example navigation button */}
      <Link href="#contact-form">
        <Button>Go to Contact Form</Button>
      </Link>

      {/* Contact Form Section */}
      <div id="contact-form" className="mt-12 w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 block w-full rounded-md border border-neutral-300 p-2 focus:ring-2 focus:ring-neutral-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full rounded-md border border-neutral-300 p-2 focus:ring-2 focus:ring-neutral-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full rounded-md border border-neutral-300 p-2 focus:ring-2 focus:ring-neutral-500"
              placeholder="Write your message..."
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
