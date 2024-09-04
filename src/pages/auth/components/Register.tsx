import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/api/member";
const FormSchema = z
  .object({
    fullName: z.string().min(1, {
      message: "Fullname must not null.",
    }),
    password: z.string().min(1, {
      message: "Password must not null.",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm Password must not null",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    register({
      fullName: data.fullName,
      password: data.password,
    })
      .unwrap()
      .then(() => {
        navigate("/auth/login");
      });
  }
  return (
    <div className="bg-white/55 backdrop-blur-sm flex-1 flex flex-col items-center py-4 max-w-[50%] min-w-[400px] rounded-md">
      <span className="text-6xl font-bold max-md:text-4xl">Register</span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Anh ruột, Doku, Nhà bé,..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="***" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="***" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex-1 flex justify-between">
            <Button
              className="bg-transparent border-2 border-black/90 text-black hover:text-white hover:border-primary/90"
              type="button"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            {isRegistering ? (
              <AiOutlineLoading3Quarters className="animate-spin" size={20} />
            ) : (
              <Button type="submit">Register</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;
