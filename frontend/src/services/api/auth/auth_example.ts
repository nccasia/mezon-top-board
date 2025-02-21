import { api } from '@app/services/apiInstance'

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    verifyEmail: build.mutation<VerifyEmailApiResponse, VerifyEmailApiArg>({
      query: (queryArg) => ({
        url: `/auth/verify-email`,
        method: 'POST',
        body: queryArg.verifyEmailDto
      })
    }),
    forgotPassword: build.mutation<ForgotPasswordApiResponse, ForgotPasswordApiArg>({
      query: (queryArg) => ({
        url: `/auth/forgot-password`,
        method: 'POST',
        body: queryArg.forgotPasswordDto
      })
    }),
    createNewPassword: build.mutation<CreateNewPasswordApiResponse, CreateNewPasswordApiArg>({
      query: (queryArg) => ({
        url: `/auth/reset-password`,
        method: 'POST',
        body: queryArg.newPasswordDto
      })
    }),
    refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>({
      query: (queryArg) => ({
        url: `/auth/refresh-token`,
        method: 'POST',
        body: queryArg.tokenDto
      })
    }),
    googleLogIn: build.mutation<GoogleLogInApiResponse, GoogleLogInApiArg>({
      query: (queryArg) => ({
        url: `/auth/google-login`,
        method: 'POST',
        body: queryArg.googleLogInDto
      })
    }),
    resendEmail: build.mutation<ResendEmailApiResponse, ResendEmailApiArg>({
      query: (queryArg) => ({
        url: `/auth/resend-email`,
        method: 'POST',
        body: queryArg.resendEmailDto
      })
    }),
    checkToken: build.mutation<CheckTokenApiResponse, CheckTokenApiArg>({
      query: (queryArg) => ({
        url: `/auth/check-token`,
        method: 'POST',
        body: queryArg.tokenDto
      })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as authService }
export type RegisterApiResponse = /** status 200  */ IResponse & {
  data: string
}
export type RegisterApiArg = {
  registerDto: RegisterDto
}
export type LoginApiResponse = /** status 200  */ IResponse & {
  data: UserTokenDto
}
export type LoginApiArg = {
  logInFormDto: LogInFormDto
}
export type VerifyEmailApiResponse = /** status 200  */ IResponse & {
  data: UserTokenDto
}
export type VerifyEmailApiArg = {
  verifyEmailDto: VerifyEmailDto
}
export type ForgotPasswordApiResponse = /** status 200  */ IResponse & {
  data: string
}
export type ForgotPasswordApiArg = {
  forgotPasswordDto: ForgotPasswordDto
}
export type CreateNewPasswordApiResponse = /** status 200  */ IResponse & {
  data: string
}
export type CreateNewPasswordApiArg = {
  newPasswordDto: NewPasswordDto
}
export type RefreshTokenApiResponse = /** status 200  */ IResponse & {
  data: UserTokenDto
}
export type RefreshTokenApiArg = {
  tokenDto: TokenDto
}
export type GoogleLogInApiResponse = /** status 200  */ IResponse & {
  data: UserTokenDto
}
export type GoogleLogInApiArg = {
  googleLogInDto: GoogleLogInDto
}
export type ResendEmailApiResponse = /** status 200  */ IResponse & {
  data: string
}
export type ResendEmailApiArg = {
  resendEmailDto: ResendEmailDto
}
export type CheckTokenApiResponse = /** status 200  */ IResponse & {
  data: boolean
}
export type CheckTokenApiArg = {
  tokenDto: TokenDto
}
export type IResponse = {
  /** Application code */
  code: Code
  /** Can be success or error message */
  message: string
  /** Is API success */
  success: boolean
  path?: string
  timestamp?: string
}
export type PhoneNumberDto = {
  /** Phone code of the user */
  countryCode?: string
  /** Phone code ID of the user */
  countryCodeId?: string
  /** Phone number with the code */
  phoneNum: string
}
export type StateAndCountryDto = {
  id: string | number
  iso2?: string
  name: string
}
export type RegisterDto = {
  /** First name of the user */
  firstName: string
  /** Last name of the user */
  lastName: string
  /** Phone number object containing phone code and number */
  phone: PhoneNumberDto
  /** Email of the user */
  email: string
  /** User's password */
  password?: string
  /** Country name */
  country?: StateAndCountryDto
  /** State name */
  state?: StateAndCountryDto
  /** City name */
  city?: StateAndCountryDto
  /** City's postal code */
  zipCode?: string
}
export type UserTokenDto = {
  accessToken: string
  refreshToken: string
}
export type LogInFormDto = {
  email: string
  password: string
}
export type VerifyEmailDto = {
  /** Verify email token */
  token: string
}
export type ForgotPasswordDto = {
  /** Email linked to the firebase authentication */
  email: string
}
export type NewPasswordDto = {
  /** Verify email token */
  token: string
  /** User email */
  email: string
  /** Password they want to reset */
  newPassword: string
}
export type TokenDto = {
  token: string
}
export type GoogleLogInDto = {
  idToken: string
}
export type ResendEmailDto = {
  email: string
  tokenType: TokenType
}
export enum Code {
  Success = 1000,
  InternalServerError = 1001,
  InvalidUserToken = 1002,
  InvalidToken = 1003,
  Unauthorized = 1004,
  UserNotVerified = 2001,
  VerifyEmailError = 2002,
  ResetPasswordError = 2003,
  CredentialError = 2004,
  UserNotFound = 2005,
  SameEmailError = 2006,
  BillingAddAvailableError = 3001
}
export enum TokenType {
  VerifyEmail = 'VERIFY_EMAIL',
  ResetPassword = 'RESET_PASSWORD'
}
export const {
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useCreateNewPasswordMutation,
  useRefreshTokenMutation,
  useGoogleLogInMutation,
  useResendEmailMutation,
  useCheckTokenMutation
} = injectedRtkApi
