import { z } from "zod";

const buyTicketsFormSchema = z.object({
  tickets: z.string().min(1).transform(Number).pipe(z.number({ message: "Please enter a number"}).int({ message: "Please enter an integer number"}).min(1))
})

export default buyTicketsFormSchema;