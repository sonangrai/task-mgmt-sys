import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginAPI, verifyAPI } from '@/api/auth'

const formSchema = z.object({
  email: z.string().email('Add a valid email'),
})

const otpFormSchema = z.object({
  otp: z.string(),
})

function AuthPage() {
  const [otpState, setOtpState] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')

  const updateOTPState = (a: boolean) => setOtpState(a)
  const updateEmailState = (a: string) => setEmail(a)

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <Card className="w-[400px] mx-auto">
        <CardHeader>Login to TMS</CardHeader>
        <CardContent>
          {otpState ? (
            <OTPForm email={email} />
          ) : (
            <LoginForm setOtp={updateOTPState} setMail={updateEmailState} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthPage

const LoginForm = ({
  setOtp,
  setMail,
}: {
  setOtp: (a: boolean) => void
  setMail: (a: string) => void
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: loginAPI,
    mutationKey: ['login'],
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    loginMutation.mutate(data.email, {
      onSuccess: () => {
        setMail(data.email)
        setOtp(true)
      },
      onError: () => console.log('vayena'),
    })
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input {...field} type="email" id="email" placeholder="Email" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        className="w-fit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Logging...' : 'Login'}
      </Button>
    </form>
  )
}

const OTPForm = ({ email }: { email: string }) => {
  const form = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: '',
    },
  })

  const verifyMutation = useMutation({
    mutationFn: verifyAPI,
    mutationKey: ['verify otp'],
  })

  const onSubmit = (data: z.infer<typeof otpFormSchema>) => {
    verifyMutation.mutate(
      {
        email: email,
        otp: data.otp,
      },
      {
        onSuccess: () => console.log('vayo'),
        onError: () => console.log('vayena'),
      },
    )
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <FieldGroup>
        <Controller
          name="otp"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="otp">OTP</FieldLabel>
              <InputOTP {...field} maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        className="w-fit"
        disabled={verifyMutation.isPending}
      >
        {verifyMutation.isPending ? 'Verifying...' : 'Verify'}
      </Button>
    </form>
  )
}
