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
  const category = [
    "fear",
    "failure",
    "friendship",
    "happiness",
    "hope",
    "inspirational",
    "intelligence",
    "learning",
    "knowledge",
    "success",
  ];

  useEffect(() => {
    const random = Math.floor(Math.random() * category.length);
    const url =
      "https://api.api-ninjas.com/v1/quotes?category=" + category[random];
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-Api-Key": "ghDf6QPIaA0bOq8PgZkHrw==Te8OW6YgPTrvwAhV",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setQuote(json[0]))
      .catch((err) => console.error("error:" + err));
  }, []);

  return (
    <div className="flex flex-col p-6 md:p-10 gap-3 justify-center items-center font-semibold border-2 border-neutral-900 shadow-md rounded-md transition-all">
      <p className="text-lg md:text-xl xl:text-2xl">{quote.quote}</p>
      <p className="self-end xl:text-lg">- {quote.author}</p>
    </div>
  );
};

export default Quote;
