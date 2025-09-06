import { useEffect, useState } from "react";

type quoteType = {
  quote: string;
  author: string;
};

const Quote = () => {
  const [quote, setQuote] = useState<quoteType>({
    quote: "",
    author: "",
  });

  useEffect(() => {
    const url = "https://api.api-ninjas.com/v1/quotes";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-Api-Key": import.meta.env.VITE_NINJAS_API_KEY,
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setQuote(json[0]))
      .catch((err) => console.error("error:" + err));
  }, []);

  return (
    <div className="flex flex-col bg-neutral-900 text-white p-6 md:p-8 gap-3 justify-center items-center font-semibold shadow-md rounded-md transition-all">
      <p className="text-lg">{quote.quote}</p>
      <p className="self-end">- {quote.author}</p>
    </div>
  );
};

export default Quote;
