"use client"
// import openai from "../utils/openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import {genAI} from '../utils/gemini';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { genAI } from "@/utils/gemini";


async function handleSubmit(values: { username: string; }) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = values.username;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const InputForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit(values);
  }

  return (
    <div className="flex items-end justify-center min-h-screen pb-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <div className="flex items-center space-x-4">
                  <FormControl>
                    <Input placeholder="Enter Your Prompt" {...field} className="flex-grow" />
                  </FormControl>
                  <Button type="submit">Submit</Button>
                </div>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default InputForm;



/*"use client"
// import openai from "../utils/openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyAohTnWETbq0JEDHh8cXB23URyK_Kq8yfs');

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

async function handleSubmit(values: { username: string; }) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = values.username;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: 'user', content: values.username }],
//     model: 'No models available',
//     // stream: true
//   });

//   console.log(completion)

//   for await (const chunk of completion) {
//     console.log(chunk.choices[0].delta.content);
//   }
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const InputForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        handleSubmit(values);
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Prompt" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default InputForm*/