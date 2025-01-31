import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mbjwwbjv");

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        <h3 className="text-2xl font-semibold mb-4">Thank you for your message!</h3>
        <p className="text-muted-foreground">I'll get back to you as soon as possible.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <Card className="gradient-card">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                className="w-full"
              />
              <ValidationError 
                prefix="Email" 
                field="email" 
                errors={state.errors}
                className="text-sm text-destructive" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                className="min-h-[150px] w-full"
              />
              <ValidationError 
                prefix="Message" 
                field="message" 
                errors={state.errors}
                className="text-sm text-destructive" 
              />
            </div>

            <Button
              type="submit"
              disabled={state.submitting}
              className="w-full"
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </Button>

            <ValidationError 
              errors={state.errors}
              className="text-sm text-destructive" 
            />
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
