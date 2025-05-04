import { Button, Card, Form, Input, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/constant";
import { validateEmail, validatePassword } from "../../../utils/emailValidator";

const SignIn = () => {
  const { Text } = Typography;
  const [signInForm] = Form.useForm();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loginSuccess, setLoginSuccess] = useState<any>({
    email: false,
    password: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    const isEmailValid = validateEmail(values?.email);
    const isPasswordValid = validatePassword(values?.password);

    if (isEmailValid?.isValid && isPasswordValid?.isValid) {
      navigate(`/${ROUTES.HOME}`);
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setLoginSuccess((prev: { email: string; password: string }) => ({
      ...prev,
      email: email,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setLoginSuccess((prev: { email: string; password: string }) => ({
      ...prev,
      password: password,
    }));
  };

  return (
    <div className=" items-center justify-center bg-surface-primary pt-[2.5rem] px-[3.2rem]   ">
      <Card className="flex  justify-center flex-col shadow-2xl w-[80vh]  h-[90vh]  rounded-3xl ">
        <div>
          <Form
            onFinish={handleSubmit}
            id="Sign-in-form"
            form={signInForm}
            autoComplete="off"
            className="flex justify-center flex-col items-center px-24"
          >
            <Text className="text-heading title_1_semibold">
              Welcome to IRCTC
            </Text>
            <Text className="text-caption mb-10 title_2_medium">
              Sign in to continue to IRCTC
            </Text>
            <Text className="mb-1 w-full text-body body_2_medium">Email</Text>
            <Form.Item
              name={"email"}
              rules={[
                {
                  required: true,
                  message:
                    "Email field is required. Please enter your email address",
                },
              ]}
              className="flex flex-col justify-start w-full mb-2"
            >
              <Input
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleUserNameChange(e)
                }
                type="text"
                id="username"
                className={` ${
                  !validateEmail(loginSuccess?.email)?.isValid
                    ? "border-error"
                    : "border-input"
                } body_1_regular`}
              />
            </Form.Item>
            <Text className="body_2_medium mb-1 w-full text-body">
              Password
            </Text>
            <Form.Item
              name={"password"}
              rules={[
                {
                  required: true,
                  message:
                    "Password field is required. Please enter your password",
                },
              ]}
              className="flex flex-col w-full justify-center mb-0 "
            >
              <Input.Password
                id="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handlePasswordChange(e)
                }
                className={` ${
                  !validatePassword(loginSuccess?.password)?.isValid
                    ? "border-error"
                    : "border-input"
                } rounded mb-1 text-base passwordField body_1_regular overflow-hidden p-0 margin-to-suffix `}
              />
            </Form.Item>
            {validateEmail(loginSuccess?.email)?.errors && (
              <div className="w-full flex">
                <div className="text-red-500 body_2_regular">
                  {validateEmail(loginSuccess?.email)?.errors}
                </div>
              </div>
            )}
            {loginSuccess?.password?.length == 0 &&
              validatePassword(loginSuccess?.password?.errors) && (
                <div className="w-full flex">
                  <div className="text-red-500 body_2_regular">
                    {validatePassword(loginSuccess?.password)?.errors}
                  </div>
                </div>
              )}
            <div className="justify-self-center mb-6 w-full text-center	mt-6">
              <Link
                to={`/${ROUTES.FORGOT_PASSWORD}`}
                className="text-action-2 hover:text-action-2-hover body_1_medium "
              >
                Forgot Password
              </Link>
            </div>
            <Form.Item className="w-full">
              <Button
                htmlType="submit"
                type="primary"
                className="w-full body_2_medium"
                size="large"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
