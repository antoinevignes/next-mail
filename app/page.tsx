"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function Home() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("smoatupal@gmail.com");
  const [emailService, setEmailService] = useState("gmail");
  const { toast } = useToast();

  const sendMessage = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          subject,
          message,
          email,
          emailService,
        }),
      });
      toast({
        variant: "success",
        title: "Email sent successfully",
      });
    } catch (error) {
      console.log("Error sending email: ", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[500px]">
        <form className="space-y-2" onSubmit={sendMessage}>
          <Label>Email</Label>
          <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Subject</Label>
          <Input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Label>Your Message</Label>
          <Textarea
            placeholder="Type your message here."
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Select
            defaultValue={emailService}
            value={emailService}
            onValueChange={(e) => setEmailService(e)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gmail">Gmail</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="default" type="submit">
            Send
          </Button>
        </form>
      </div>
    </main>
  );
}
