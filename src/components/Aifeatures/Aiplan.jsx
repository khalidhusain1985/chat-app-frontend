
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import chatbg from "../../assets/chatbg.png"

export function Aiplan() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/ai-features");
  };

  

  return (
    <div className="p-6" style={{ backgroundImage: `url(${chatbg})` }}>
      <button
        onClick={handleBackClick}
        className="mb-6 text-teal-700 font-bold hover:underline flex items-center"
      >
        <ArrowBackIcon />
      </button>

      <div className="text-center py-8 font-bold text-[30px] text-teal-700">Select Your Time Period </div>

      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-center items-center">
        <div className="w-full max-w-sm p-4 bg-white  border border-gray-200 rounded-lg shadow sm:p-8 ">
          <h5 className="mb-4 text-xl font-medium text-black">
            Monthly Plan
          </h5>
          <div className="flex items-baseline text-teal-700">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">9.99</span>
            
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
            
          </ul>
          <a href="https://www.instamojo.com/@k2kitsupport/l6630c104487b4aefa9bd815588cdc1e7/" target="_blank" rel="noopener noreferrer">
  <button
    type="button"
    className="text-white bg-teal-700 py-2 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
  >
    Domestic Payment
  </button>
</a>
<div className="py-2">
          <a href="https://buy.stripe.com/7sI4gY51w0qLclW9AK" target="_blank" rel="noopener noreferrer">
  <button
    type="button"
    className="text-white bg-teal-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
  >
    International Payment
  </button>
</a>
</div>

        </div>

        <div className="w-full max-w-sm p-4 bg-white  border border-gray-200 rounded-lg shadow sm:p-8 ">
          <h5 className="mb-4 text-xl font-medium text-black">
          Quarterly <span>(10% off)</span>
          </h5>
          <div className="flex items-baseline text-teal-700">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">26.97</span>
            
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
            
          </ul>
          <a href="https://www.instamojo.com/@k2kitsupport/l5073ae56337148339aaf1e7990ae9192/" target="_blank" rel="noopener noreferrer">
  <button
    type="button"
    className="text-white bg-teal-700 py-2 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
  >
    Domestic Payment
  </button>
</a>
<div className="py-2">
          <a href="https://buy.stripe.com/dR63cUfGac9t2Lm4gr " target="_blank" rel="noopener noreferrer">
  <button
    type="button"
    className="text-white bg-teal-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
  >
    International Payment
  </button>
</a>
</div>
        </div>

        <div className="w-full max-w-sm p-4 bg-white  border border-gray-200 rounded-lg shadow sm:p-8 ">
          <h5 className="mb-4 text-xl font-medium text-black">
            Yearly <span>(20% off)</span>
          </h5>
          <div className="flex items-baseline text-teal-700">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">95.90            </span>
            
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
            
          </ul>
          <a href="https://www.instamojo.com/@k2kitsupport/l2dd315e00c774b2eb8c22043523cc9a7/" target="_blank" rel="noopener noreferrer">
  <button
    type="button"
    className="text-white bg-teal-700  hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
  >
    Domestic Payment
  </button>
</a>
<br/>
<div className="py-2">
          <a href="https://buy.stripe.com/eVacNu0Lg3CX2Lm6oA" target="_blank" rel="noopener noreferrer">
  <button
    type="button"
    className="text-white bg-teal-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
  >
    International Payment
  </button>
</a>
</div>
        </div>

        
      </div>
    </div>
  );
}
