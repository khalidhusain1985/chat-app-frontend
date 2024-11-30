
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import chatbg from "../../assets/chatbg.png"

export function Aifeatures() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/app");
  };

  return (
    <div className="p-6" style={{ backgroundImage: `url(${chatbg})` }}>
      <button
        onClick={handleBackClick}
        className="mb-6 text-teal-700 font-bold hover:underline flex items-center"
      >
        <ArrowBackIcon />
      </button>

      <div className="text-center py-8 font-bold text-[30px] text-teal-700">Ai Features That Could Be Enabled By You </div>

      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-center items-center">
        <div className="w-full max-w-sm p-4 bg-white  border border-gray-200 rounded-lg shadow sm:p-8 ">
          <h5 className="mb-4 text-xl font-medium text-black">
            Standard plan
          </h5>
          <div className="flex items-baseline text-teal-700">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">Free</span>
            <span className="ms-1 text-xl font-normal text-black">
              /month
            </span>
          </div>
          <ul role="list" className="space-y-5 my-7">
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-teal-700 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-black ms-3">
                Chat Encryption decryption
                <br/>
                (Your chat get encrypted and decrypted)
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-teal-700 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-black ms-3">
                Nudity and abuse Detection
                <br/>
                (Users cant share adult Content)
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-teal-700 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-black ms-3">
                Audio call & video call
                <br/>
                (1 to 1 call connection)
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-teal-700 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-black ms-3">
                Free Emojis
                <br/>
                (Provided some Emojis)
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-teal-700 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-black ms-3">
                Media sharing
                <br/>
                (Can share Media within 10mb)
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-teal-700 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-black ms-3">
                Chat
                <br/>
                (Can Chat with Users)
              </span>
            </li>
            
          </ul>
          <button
            type="button"
            className="text-white bg-teal-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-200  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >
            Choose plan
          </button>
        </div>

        <div className="w-full max-w-sm p-4 bg-white  border border-gray-200 rounded-lg shadow sm:p-8 ">
          <h5 className="mb-4 text-xl font-medium text-black">
            Advance AI plan
          </h5>
          <div className="flex items-baseline text-teal-700">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">9.99</span>
            <span className="ms-1 text-xl font-normal text-black">
              /month
            </span>
          </div>
          <ul role="list" className="space-y-5 my-7">
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-teal-700 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-black ms-3">
                Include All Features of Standard plans with advance AI features
                
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-teal-700 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-black ms-3">
              Chat Delete Timer
              <br/>
              (User Can Delete their chat with timer)
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-teal-700 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-black ms-3">
                Text Summarization
                <br/>
                (Make Long paragraphs into 1-2 liner)
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-teal-700 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-black ms-3">
              AI Video Call Effect
                <br/>
                (Ai filters)
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-teal-700 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-black ms-3">
                Media sharing
                <br/>
                (Can share Media within 10mb)
              </span>
            </li>
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-teal-700 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-black ms-3">
                Chat
                <br/>
                (Can Chat with Users)
              </span>
            </li>
            
          </ul>
          <button
            type="button"
            className="text-white bg-teal-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-200  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >
            Choose plan
          </button>
        </div>

        
      </div>
    </div>
  );
}
