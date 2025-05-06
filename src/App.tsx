import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import * as Types from "../types/quote.types";

function App() {
  const [page, setPage] = useState(false);
  const [quote, setQuote] = useState<Types.Quote>();

  const getQuote = async () => {
    const response = await axios.get("https://dummyjson.com/quotes/random");
    console.log(response.data);
    setQuote(response.data);
  };

  const handleClick = () => {
    setPage(!page);
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <>
      <div className="text flex gap-16 justify-center items-center h-screen">
        <div className="left flex flex-col gap-2">
          <h1 className="text-[#fad07b] text-4xl font-bold">Welcome</h1>

          <div
            onClick={handleClick}
            className="leftbox border-2 w-[300px] h-[300px] border-[#fad07b] rounded-lg"
          >
            {page === true ? (
              <div className="text-[#fad07b] text-2xl p-4">
                <p>{quote?.quote}</p>
                &nbsp;
                <p>{quote?.author}</p>
              </div>
            ) : (
              <img
                className="rounded-lg border-2 border-[#fad07b]"
                src="https://picsum.photos/300"
              />
            )}
          </div>
        </div>
        <div className="right text-2xl">
          <h2 className="text-[#ed8274] text-4xl font-bold">Links</h2>
          <p>
            ├ <a href="https://github.com/maciejszaman">Github</a>
          </p>
          <p>
            ├ <a href="https://www.youtube.com/">Youtube</a>
          </p>
          <p>
            ├ <a href="https://www.twitch.tv/h2p_gucio">Twitch</a>
          </p>
          <p>
            ├ <a href="https://x.com/">X</a>
          </p>
          <p>
            ├ <a href="https://mail.google.com/mail/u/0/">Gmail</a>
          </p>
          <p>
            ├ <a href="https://www.pepper.pl/">pepper pl</a>
          </p>
          <p>
            └ <a href="https://openai.com/">chatgpt</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
