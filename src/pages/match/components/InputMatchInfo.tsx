import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FaCalendarAlt } from "react-icons/fa";
import { TimePicker } from "@/customComponents";
import { useCreateMatchMutation } from "@/api/match";
import { useCreateMatchContext } from "../CreateMatchLayout";
import { useNavigate } from "react-router-dom";
const FormSchema = z.object({
  fieldAdress: z.string().min(1, {
    message: "Address must not null.",
  }),
  eventDate: z.date({
    required_error: "Event date is required.",
  }),
  eventHour: z.string().min(1, {
    message: "Hour must not null.",
  }),
  eventMinute: z.string().min(1, {
    message: "Minute must not null.",
  }),
});
export const InputMatchInfo = () => {
  const { handleNextStep, user } = useCreateMatchContext();
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fieldAdress: "",
      eventDate: new Date(),
      eventHour: "18",
      eventMinute: "30",
    },
  });
  const [createMatch, { isLoading: isCreatingMatch }] =
    useCreateMatchMutation();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const dateTime = data.eventDate.setHours(
      parseInt(data.eventHour),
      parseInt(data.eventMinute)
    );
    if (!user) {
      return;
    }
    createMatch({
      creatorId: user.id,
      eventDate: dateTime.toString(),
      fieldAddress: data.fieldAdress,
    }).then((result) => {
      console.log(result);
      navigate(`/create-match/${result.data?.id}/step-2`)
      handleNextStep();
    });
  }
  return (
    <div className="w-full pt-16 flex flex-col items-center justify-center">
      <div className="font-palanquin font-semibold text-3xl pb-4 dark:text-white">
        Match Information
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 text-white"
        >
          <FormField
            control={form.control}
            name="fieldAdress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white">Address*: </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Địa chỉ sân..."
                    {...field}
                    className="text-black dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row items-start justify-between max-md:flex-col max-md:items-start max-md:gap-5">
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2">
                  <FormLabel className="text-black dark:text-white">Date*: </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-palanquin text-vBlackLight dark:text-white",
                            !field.value && "text-vBlackLight dark:text-white"
                          )}
                        >
                          {field.value ? (
                            <span>{format(field.value, "P")}</span>
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <FaCalendarAlt className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date <= new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-4 items-end">
              <FormField
                control={form.control}
                name="eventHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-white">Time*: </FormLabel>
                    <FormControl>
                      <TimePicker field={field} arrayItem={Array(24)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <span className="text-center"> : </span> */}
              <FormField
                control={form.control}
                name="eventMinute"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Minute*: </FormLabel> */}
                    <FormControl>
                      <TimePicker field={field} arrayItem={Array(61)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex-1 flex justify-end items-center">
            {isCreatingMatch ? (
              <AiOutlineLoading3Quarters className="animate-spin" size={24} />
            ) : (
              <Button
                type="submit"
                className="px-8 bg-vRedBold hover:bg-vRedLight"
              >
                <span className="font-palanquin font-semibold text-base">
                  Create
                </span>
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
