const Spotify = () => {
  const tracks = [
    "0BxE4FqsDD1Ot4YuBXwAPp",
    "2x8evxqUlF0eRabbW2JBJd",
    "5kxVyCgEUND7E2QKG7JmoF",
    "086myS9r57YsLbJpU0TgK9",
    "5FVd6KXrgO9B3JPmC8OPst",
    "5XeFesFbtLpXzIVDNQP22n",
    "0NdTUS4UiNYCNn5FgVqKQY",
    "0d28khcov6AiegSCpG5TuT",
    "2bfGNzdiRa1jXZRdfssSzR",
    "3lIxtCaROdRDuTnNBDm3n2",
    "0q6LuUqGLUiCPP1cbdwFs3",
    "2nZ33CKRbgpJQJJQKHuGXb",
    "1foMv2HQwfQ2vntFf9HFeG",
    "1MJqPD36uC9lUOc0rhbxzr",
    "3I0FBDc1c1BLNtXWKVjmFg",
    "4WEuEfFiczWxblHyuucSBL",
    "2lD6AoA8qf2t4Dkf2TcmNK",
    "0UtnpKaReKUg2GquaSxCyD",
    "5h5tBFnbcVioFXiOixTn6E",
    "40wUM3LFZOlUcZfxEIZrYK",
    "7Ks4VCY1wFebnOdJrM13t6",
    "7uWVT3UkCAZyANvv0bdyQn",
    "1bxEpNR75Hq3T2oF9AZjt8",
    "3iVcZ5G6tvkXZkZKlMpIUs",
    "0N3W5peJUQtI4eyR6GJT5O",
    "3ODXRUPL44f04cCacwiCLC",
    "6HZILIRieu8S0iqY8kIKhj",
    "1EaKU4dMbesXXd3BrLCtYG",
    "2LTlO3NuNVN70lp2ZbVswF",
    "6IZvVAP7VPPnsGX6bvgkqg",
    "7ujx3NYtwO2LkmKGz59mXp",
    "6PGoSes0D9eUDeeAafB2As",
    "0y9uTzK9cNKSAEHnpeRG8C",
    "5Gt9bxniM1SxN61yRzRhXL",
    "2FeBslNBMdR9V58uv6hd2t",
    "2g6tReTlM2Akp41g0HaeXN",
    "3lzUeaCbcCDB5IXYfqWRlF",
    "7pj6P5WnxkZsw3XRc8eMe1",
    "5xoYormSTltk6F9SlQV6mm",
    "5qbhVL3vB7HwWvb0042B7y",
    "51RN0kzWd7xeR4th5HsEtW",
    "5hVghJ4KaYES3BFUATCYn0",
    "4f8Mh5wuWHOsfXtzjrJB3t",
    "5QvBXUm5MglLJ3iBfTX2Wo",
    "0fv2KH6hac06J86hBUTcSf",
    "1nXZnTALNXiPlvXotqHm66",
    "0wEC0GNF74lAqrEFZJMl1m",
    "1hz7SRTGUNAtIQ46qiNv2p",
    "5TxRUOsGeWeRl3xOML59Ai",
    "3EG9FJ0ToLfgnc1IG2Z1wz",
    "5B0kgjHULYJhAQkK5XsMoC",
    "7z4xW9WY86uH3gd1V9pfCM",
    "2sFEmuVVAa2klHwhFaT0rR",
    "6OfOzTitafSnsaunQLuNFw",
    "410ZZP746AQeiywhKvXWCo",
    "7KA4W4McWYRpgf0fWsJZWB",
    "6KuXb26rHuRy3ZDse1VRmx",
    "4bEcoz1OcfMgUbp2ft8ieQ",
    "0qtK3XwbuG153dmwB8iepL",
    "3jHdKaLCkuNEkWcLVmQPCX",
    "078C2jXg7XsMgW78Gfx1JA",
    "2xZcwCCcf3tZWXW4yABBkI",
    "2qkhKEikKcL5FgYZ7iiY52",
    "4fi95SJFCEipkjI7IMNF5N",
    "5WzfCu5fhgm7jv896EN1Md",
    "3FkTxVBsQHrwMh3IyfKO81",
    "4k6Uh1HXdhtusDW5y8Gbvy",
    "4OmfWzukSVD140NiAIEjem",
    "0DmkBOGgEWMbUJlL6VwwF2",
    "6uVZddXkgQIArp8myEHs4x",
    "0f8eRy9A0n6zXpKSHSCAEp",
    "6M0EP76qW9TG4SNU0agu94",
    "4riDfclV7kPDT9D58FpmHd",
    "12ILYlOEfWL8ei0BEgFJn0",
    "3NOIkyNWG0fEjkPkq9HVMW",
    "4AFsRbaLKRWo3dDtjDFA2V",
    "0WtDGnWL2KrMCk0mI1Gpwz",
    "5cc9Zbfp9u10sfJeKZ3h16",
    "0YsGMHid6sFq5PcToe3JZE",
    "0zo4aX57COch7Wh3NRImTM",
    "4gT3mNJA8lnlkYFqGZ8IA2",
    "5bJ1DrEM4hNCafcDd1oxHx",
    "39NDBdU5Xkm5pCFGa5kZtI",
    "2ZWlPOoWh0626oTaHrnl2a",
    "3xKsf9qdS1CyvXSMEid6g8",
    "2LMkwUfqC6S6s6qDVlEuzV",
    "7eqoqGkKwgOaWNNHx90uEZ",
    "4QhWbupniDd44EDtnh2bFJ",
    "6Nle9hKrkL1wQpwNfEkxjh",
    "4S4Mfvv03M1cHgIOJcbUCL",
    "70LcF31zb1H0PyJoS1Sx1r",
    "10nyNJ6zNy2YVYLrcwLccB",
    "2CVV8PtUYYsux8XOzWkCP0",
    "2fuYa3Lx06QQJAm0MjztKr",
    "0gTRROuntlrPQ64W3J2Etv",
    "63OQupATfueTdZMWTxW03A",
    "0z1o5L7HJx562xZSATcIpY",
    "6LgJvl0Xdtc73RJ1mmpotq",
    "1dyTcli07c77mtQK3ahUZR",
    "2a1iMaoWQ5MnvLFBDv4qkf",
    "73CKjW3vsUXRpy3NnX4H7F",
    "6UO72VSXEONxdfLyABihs9",
    "0jyikFM0Umv0KlnrOEKtTG",
    "5XuU9htN358NTMCcqRvfDV",
    "1elQc2QcyuBkI8FUIbNvcy",
    "2QwObYJWyJTiozvs0RI7CF",
    "0YJ9FWWHn9EfnN0lHwbzvV",
    "4wajJ1o7jWIg62YqpkHC7S",
    "4pWIwnnqx8k01fuF95UMIg",
    "5Qv2Nby1xTr9pQyjkrc94J",
    "4oXg7xT4ksBxHTx8PcmSXw",
    "35YyxFpE0ZTOoqFx5bADW8",
    "2QeutlLcJf2V1cMUUsDFT1",
    "5xJc58mBWz68WhwU2n5seR",
    "0cGhVtElTkkJMcs0CQUPxR",
    "2zco38BnUzODIa6duYk8On",
    "4CeeEOM32jQcH3eN9Q2dGj",
    "2RsAajgo0g7bMCHxwH3Sk0",
    "5vHLwhxxlGzmClMcxRRFPr",
    "3PyPpABRA2bTGhNwPd66H6",
    "2mvffzYUJ9Ld9xhsF5DUjU",
    "0bTLGlCqwZXwJGWGE2Dywg",
    "4gHnSNHs8RyVukKoWdS99f",
    "5gRcv46AMTrosmTOqrOV3Q",
    "66w5OYw2ja8lnmaA3Ns0PU",
    "2i5K0EdMY5zFs9t7KfYK3k",
    "1Ic9pKxGSJGM0LKeqf6lGe",
    "55yvzYuvJYG2RUEnMK78tr",
    "1XnPVbzLhuBv0sHaCTgyoi",
    "3mwvKOyMmG77zZRunnxp9E",
    "6VoIBz0VhCyz7OdEoRYDiA",
    "5WhtlIoxoZrMmuaWWEQhwV",
    "07n8herweO0s6AmVvWGg38",
    "2takcwOaAZWiXQijPHIx7B",
    "7xyYsOvq5Ec3P4fr6mM9fD",
    "3lPr8ghNDBLc2uZovNyLs9",
    "3skn2lauGk7Dx6bVIt5DVj",
    "5PK1JCSdr34gWgzYHgt3Jq",
    "21Qsj3cMVCx2xF2EVVNbEu",
    "4AzyYHQKBphpQonm3Hx15E",
    "25tZHMv3ctlzqDaHAeuU9c",
    "2k1yPYf9WGA4LiqcLVwtzn",
    "3z8h0TU7ReDPLIbEnYhWZb",
    "300YN8ebGB90nDuzgz0f3O",
    "6suU8oBlW4O2pg88tOXgHo",
    "07Vvsu4HGrXmD6jAXWE4CK",
    "7kFIFKWcf2zFMYCHOexAF8",
    "0pQskrTITgmCMyr85tb9qq",
    "72Z17vmmeQKAg8bptWvpVG",
    "7snQQk1zcKl8gZ92AnueZW",
    "0G21yYKMZoHa30cYVi1iA8",
    "2N2yrmodOnVF10mKvItC9P",
    "4JiEyzf0Md7KEFFGWDDdCr",
    "2MuWTIM3b0YEAskbeeFE1i",
    "5sICkBXVmaCQk5aISGR3x1",
    "0nLiqZ6A27jJri2VCalIUs",
    "08mG3Y1vljYA6bvDt4Wqkj",
    "2zYzyRzz6pRmhPzyfMEC8s",
    "2d4e45fmUnguxh6yqC7gNT",
    "57bgtoPSgt236HzfBOd8kj",
    "2aibwv5hGXSgw7Yru8IYTO",
    "2uuMXKKmdXrY2XxsqTsGp0",
    "5CQ30WqJwcep0pYcV4AMNc",
    "63T7DJ1AFDD6Bn8VzG6JE8",
    "1Jmqubf9kGkWeYQXQKImL5",
    "6Q8s3YuAWkx0Qui0Jgkr5m",
    "5e9TFTbltYBg2xThimr0rU",
    "5MxNLUsfh7uzROypsoO5qe",
    "07q0QVgO56EorrSGHC48y3",
    "2EqlS6tkEnglzr7tkKAAYD",
    "6dGnYIeXmHdcikdzNNDMm2",
    "6EOKwO6WaLal58MSsi6U4W",
    "561F1zqRwGPCTMRsLsXVtL",
    "7zLGHdfJ3JRPxvc96mEPEi",
    "52ojopYMUzeNcudsoz7O9D",
    "6K4t31amVTZDgR3sKmwUJJ",
    "2X485T9Z5Ly0xyaghN73ed",
    "5M4yti0QxgqJieUYaEXcpw",
    "1cCbsojaA6GIT7Y3zuMJ1q",
    "0mO6oS60RST2sWmN2FKknP",
    "5hM5arv9KDbCHS0k9uqwjr",
    "3So9q3qlw0Alvvn1elZPRE",
    "7fBv7CLKzipRk6EC6TWHOB",
    "22VdIZQfgXJea34mQxlt81",
    "4frLb7nWtsz2ymBE6k2GRP",
    "4EDijkJdHBZZ0GwJ12iTAj",
    "7MXVkk9YMctZqd1Srtv4MB",
    "00NAQYOP4AmWR549nnYJZu",
    "37F0uwRSrdzkBiuj0D5UHI",
    "2LBqCSwhJGcFQeTHMVGwy3",
    "3dhjNA0jGA8vHBQ1VdD6vV",
    "09mEdoA6zrmBPgTEN5qXmN",
    "4ppTAJUbNXELZcoUaL90wo",
    "1cKHdTo9u0ZymJdPGSh6nq",
    "6huNf4dutXRjJyGn7f5BPS",
    "0VjIjW4GlUZAMYd2vXMi3b",
    "5QO79kh1waicV47BqGRL3g",
    "2p8IUWQDrpjuFltbdgLOag",
    "6bnF93Rx87YqUBLSgjiMU8",
    "22UDw8rSfLbUsaAGTXQ4Z8",
    "5SkRLpaGtvYPhw02vZhQQ9",
    "5g1vtHqi9uV7xtYeCcFOBx",
    "3A4cpTBPaIQdtPFb5JxtaX",
    "4mmkhcEm1Ljy1U9nwtsxUo",
    "1ko2NuvWlQdxtNRc8QQzmT",
    "2dxjKgT0li4qBI3QwuN9Ih",
    "1PS1QMdUqOal0ai3Gt7sDQ",
    "46OFHBw45fNi7QNjSetITR",
    "2DHNCWZYmVr1Lv08q5b0kB",
    "6MXXY2eiWkpDCezVCc0cMH",
    "4UQMOPSUVJVicIQzjAcRRZ",
    "0mEdbdeRFQwBhN4xfyIeUM",
    "4fzsfWzRhPawzqhX8Qt9F3",
    "2ovQ5MCx91XVjgVWEPfvks",
    "5TRPicyLGbAF2LGBFbHGvO",
    "0NrtwAmRAdLxua31SzHvXr",
    "4jQqM4NI79HEcWHUJb8Hvf",
    "4EWCNWgDS8707fNSZ1oaA5",
    "2gZUPNdnz5Y45eiGxpHGSc",
    "3DK6m7It6Pw857FcQftMds",
    "1UGD3lW3tDmgZfAVDh6w7r",
    "23SZWX2IaDnxmhFsSLvkG2",
    "22L7bfCiAkJo5xGSQgmiIO",
    "3sNVsP50132BTNlImLx70i",
    "1gqkRc9WtOpnGIqxf2Hvzr",
    "4cAgkb0ifwn0FSHGXnr4F6",
    "722tgOgdIbNe3BEyLnejw4",
    "4KW1lqgSr8TKrvBII0Brf8",
    "1eQBEelI2NCy7AUTerX0KS",
    "66Q3fAmSX5eHamgbKa9alP",
    "432hUIl3ISDeytYW5XBQ5h",
    "1qsHYUd2c1wFGcn7e63QmG",
    "3U21A07gAloCc4P7J8rxcn",
    "7vgTNTaEz3CsBZ1N4YQalM",
    "3s7MCdXyWmwjdcWh7GWXas",
    "6xRWoYwfwIKnT8bQGzKbxR",
    "0WSEq9Ko4kFPt8yo3ICd6T",
    "3onYsG7nB3FwEVHYYWCrIM",
    "6gBFPUFcJLzWGx4lenP6h2",
    "20dP2DaMHIAmwWAbp7peSr",
    "3eekarcy7kvN4yt5ZFzltW",
    "51EC3I1nQXpec4gDk0mQyP",
    "0hL9gOw6XBWsygEUcVjxEc",
    "42VsgItocQwOQC3XWZ8JNA",
    "6wsqVwoiVH2kde4k4KKAFU",
    "4kjI1gwQZRKNDkw1nI475M",
    "1i9lZvlaDdWDPyXEE95aiq",
    "76gcXhY3Zv6wW0BTe9nHJo",
    "3QFInJAm9eyaho5vBzxInN",
    "1Is8hGpkGMiePASAxBluxM",
    "5FkoSXiJPKTNyYgALRJFhD",
    "58k32my5lKofeZRtIvBDg9",
    "2dHHgzDwk4BJdRwy9uXhTO",
    "2Hh3ETdQKrmSI3QS0hme7g",
    "5wG3HvLhF6Y5KTGlK0IW3J",
    "1pacwLXyRO47ka0v6LTIiY",
    "6pcywuOeGGWeOQzdUyti6k",
    "3ruoIF2UnoXdzK8mR61ebq",
    "6x9pCndnXEoea0CMcfjs9W",
    "6TdFkofgTvN0WfnWFmh4a6",
    "29TPjc8wxfz4XMn21O7VsZ",
    "4CzhtKifG867Lu5DNQVBSA",
    "1e1JKLEDKP7hEQzJfNAgPl",
    "2c2tlXfEmLgUNvxngIi1qL",
    "3zakx7RAwdkUQlOoQ7SJRt",
    "2J6OF7CkpdQGSfm1wdclqn",
    "0oufSLnKQDoBFX5mgkDCgR",
    "0RiRZpuVRbi7oqRdSMwhQY",
    "21jGcNKet2qwijlDFuPiPb",
    "7xQAfvXzm3AkraOtGPWIZg",
    "285pBltuF7vW8TeWk8hdRR",
    "3FAclTFfvUuQYnEsptbK8w",
    "3XVBdLihbNbxUwZosxcGuJ",
    "3gkiUzAUBH035zRHy7KyJg",
    "1otG6j1WHNvl9WgXLWkHTo",
    "4LRPiXqCikLlN15c3yImP7",
    "5KUNwkaNf8l5A9sXZhiCgI",
    "4BnrGx9tWNF8aiXl1UhDBa",
    "4b82tXj35SycILuILcgBQ6",
    "21O0XXPEWPtePt5RMY93Ob",
    "4WM1hvYr2NC6bQnQXcj3sH",
    "1gT5TGwbkkkUliNzHRIGi1",
    "3Osd3Yf8K73aj4ySn6LrvK",
    "3yfqSUWxFvZELEM4PmlwIR",
    "7lQ8MOhq6IN2w8EYcFNSUk",
    "4woTEX1wYOTGDqNXuavlRC",
    "561jH07mF1jHuk7KlaeF0s",
    "2qOm7ukLyHUXWyR4ZWLwxA",
    "2Ih217RCGAmyQR68Nn7Cqo",
    "23OXdR7YuUBVWh5hSnYJau",
    "42FUHJlwWSKZjjIs3Ihzmz",
    "5yKbNvpz9jK8aYfwBiimZM",
    "0rKtyWc8bvkriBthvHKY8d",
    "39oeKRgsLeynDIbWuXyA47",
    "1VGzxJnVQND7Cg5H5wGj14",
    "0HItcI6qN6Dr4MC3CZryQh",
    "0rOLFkjY5DSIViVBNnzOuK",
    "3AkdSFo7quCZ781KCqNK0T",
    "435yU2MvEGfDdmbH0noWZ0",
    "3IznIgmXtrUaoPWpQTy5jB",
    "6QeYSvYqYUsfBzsApbjDHO",
    "6dBUzqjtbnIa1TwYbyw5CM",
    "72cGBEqu7RitIOoACXYjfR",
    "21LkHnuxPxVrOZ5gCaG7aM",
    "39sDitIeCMrVX2QyXHY46t",
    "7aQjPecQdIuNd1sz3KCDhD",
    "6ZaiqbV2GfUtrUlhsu58fN",
    "7H7NyZ3G075GqPx2evsfeb",
    "6jgkEbmQ2F2onEqsEhiliL",
    "3HlK8txWAdtKMrbsqX40pl",
    "2R4AlwtrrkMaRKojcTIzmL",
    "2QzKAF0y1BQhxwg8N05Uog",
    "2fhOljbX79loRcdl47SFye",
    "7EAMXbLcL0qXmciM5SwMh2",
    "2aaCNg42RA74s0EmHTBqS7",
    "7D0RhFcb3CrfPuTJ0obrod",
    "3AJwUDP919kvQ9QcozQPxg",
    "75JFxkI2RXiU7L9VXzMkle",
    "0BCPKOYdS2jbQ8iyB56Zns",
    "7LVHVU3tWfcxj5aiPFEW4Q",
    "6nek1Nin9q48AVZcWs9e9D",
    "69uxyAqqPIsUyTO8txoP2M",
    "3vkCueOmm7xQDoJ17W1Pm3",
    "3jjsRKEsF42ccXf8kWR3nu",
    "2P5yIMu2DNeMXTyOANKS6k",
    "3sslYZcFKtUvIEWN9lADgr",
    "5411TEB6tlzvuF5A4oyldr",
    "0JIMT9gzLIIz0esKLyjbKf",
    "1KIJclzEbNhSVw8tiHPWwE",
    "5KbTBSGUvgDg75gIVhUaAW",
    "7s5VQqrjBtrBgZL4pEa46S",
    "6RiiSy9GzSwiyDEJDiMuKe",
    "4SqWKzw0CbA05TGszDgMlc",
    "3mkS1alZdcdBQuIMad8aee",
    "5ruzrDWcT0vuJIOMW7gMnW",
    "0KzAbK6nItSqNh8q70tb0K",
    "2cGxRwrMyEAp8dEbuZaVv6",
    "49X0LAl6faAusYq02PRAY6",
    "7CH99b2i1TXS5P8UUyWtnM",
    "3hxIUxnT27p5WcmjGUXNwx",
    "2Y0iGXY6m6immVb2ktbseM",
  ];

  return (
    <div className="flex-grow md:px-1 flex items-center bg-[#282828] rounded-md">
      <iframe
        src={`https://open.spotify.com/embed/track/${
          tracks[Math.floor(Math.random() * tracks.length)]
        }?utm_source=generator&theme=0`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        height="152"
        width="100%"
      />
    </div>
  );
};

export default Spotify;
