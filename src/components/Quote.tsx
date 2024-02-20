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
    <div className="flex flex-col bg-neutral-900 text-white p-6 md:p-8 gap-3 justify-center items-center font-semibold shadow-md rounded-md transition-all">
      <p className="text-lg">{quote.quote}</p>
      <p className="self-end">- {quote.author}</p>
    </div>
  );
};

export default Quote;
