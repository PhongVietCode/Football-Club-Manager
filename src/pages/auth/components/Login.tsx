import { Input } from "@/components/ui/input";
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
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/api/auth";
import { LoadingSpin } from "@/customComponents/LoadingSpin";
const FormSchema = z.object({
  fullName: z.string().min(1, {
    message: "Fullname must not null.",
  }),
  password: z.string().min(1, {
    message: "Password must not null.",
  }),
});
const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading: isLogingIn }] = useLoginMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    localStorage.removeItem("accessToken")
    login(data)
      .unwrap()
      .then(() => {
        navigate("/");
      });
  }
  return (
    <div className="bg-white/55 backdrop-blur-sm flex-1 flex flex-col items-center py-4 max-w-[50%] min-w-[400px] rounded-md">
      <span className="text-4xl font-bold max-md:text-2xl">Login</span>
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
          <div className="flex-1 flex justify-between">
            <div>
              <Button
                type="button"
                className="bg-transparent border-2 border-black/90 text-black hover:text-white hover:border-primary/90"
                onClick={() => navigate("/auth/register")}
              >
                Register
              </Button>
            </div>
            {isLogingIn ? <LoadingSpin /> : <Button type="submit">Login</Button>}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
