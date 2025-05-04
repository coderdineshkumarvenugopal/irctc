import SVG from "react-inlinesvg";
import SignIn from "./sign-in/SignIn";
import loginPage from "/images/Login/LoginPage.svg";

export interface CarouselComponentProps {
  image: string;
  title: string;
  description: string;
}

const CarouselComponent = () => {
  return (
    <div className="flex justify-center items-center mb-8 ">
      <div className="flex-col">
        <div className="flex flex-col items-center mx-auto ">
          <div className="text-action text-white title_1_semibold text-center">
            Indian Railway Catering and Tourism Corporation
          </div>
          <div className="text-action text-white text-center mt-2 mb-6 title_2_medium">
            Welcomes You
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <div className=" h-full grid grid-cols-1 md:grid-cols-2 bg-gradient-to-r from-slate-900 to-blue-800 overflow-hidden ">
      <div className="flex flex-col items-center justify-center ">
        <div className="flex items-center justify-center sm:h-1/2 xl:h-full">
          {/* <Carousel className="mb-6">
            {bannerImages.map((image, index) => (
              <div key={index}>
                <img src={image}/>
              </div>
            ))}
          </Carousel> */}
          <SVG
            className="mx-auto md:w-1/2 xl:w-[70%] 2xl:w-full px-10 "
            src={loginPage}
          />
        </div>
        <CarouselComponent />
      </div>
      <SignIn />
    </div>
  );
};

export default Login;
