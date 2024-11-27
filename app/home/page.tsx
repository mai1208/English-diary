'use client'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Card
} from "@/components/ui/card"
import { useState } from "react"
import { aiApi } from './action'



const formSchema = z.object({
    textJa: z.string().min(2).max(300),
    textEn: z.string().min(0).max(300),
})

export default function HomePage() {
    const [submit, setSubmit] = useState<boolean>(false);
    const [textJa, setTextJa] = useState<string>('');
    const [textEn, setTextEn] = useState<string>('');
    const [sampleText, setSampleText] = useState<string>('');
    const [explanation, setExplanation] = useState<string>('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            textJa: "",
            textEn: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await aiApi(values.textJa);
        const answers = res.split('＃')
        console.log(answers)
        setSampleText(answers[0].split('"')[1])
        setExplanation(answers[1].split('ポイント：')[1])
        setSubmit(true)
        setTextJa(values.textJa)
        setTextEn(values.textEn)
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const inputContents = <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
                control={form.control}
                name="textJa"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>今日あったことを簡単に書いてみよう</FormLabel>
                        <FormControl>
                            <Textarea className="max-w-[400px] p-1 text-sm" {...field} />
                        </FormControl>
                        {/* <FormDescription>
                    </FormDescription> */}
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="textEn"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>英語で書いてみよう</FormLabel>
                        <FormControl>
                            <Textarea className="max-w-[400px] p-1 text-sm" {...field} />
                        </FormControl>
                        {/* <FormDescription>
                    </FormDescription> */}
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit">Submit</Button>
        </form>
    </Form>

    return (
        <div className="m-3">
            <div className="mb-2 text-lg font-bold">
                English Diary
            </div>
            {!submit ? inputContents :
                <div className="text-sm">
                    <div>今日あったことを簡単に書いてみよう</div>
                    <Card className="p-3">{textJa}</Card>
                    <div className="mt-3">英語で書いてみよう</div>
                    <Card className="p-3">{textEn}</Card>
                    <div className="mt-3">簡単な例文</div>
                    <Card className="p-3">{sampleText}</Card>
                    <div className="mt-3">解説</div>
                    <Card className="p-3">{explanation}</Card>
                </div>
            }
        </div>
    );
}
