//@ts-nocheck
import Gmail from "../assets/link/google.svg?react";
import Youtube from "../assets/link/youtube.svg?react";
import Linkedin from "../assets/link/linkedin.svg?react";
import Github from "../assets/link/github.svg?react";
import Reddit from "../assets/link/reddit.svg?react";
import Instagram from "../assets/link/instagram.svg?react";
import Facebook from "../assets/link/facebook.svg?react";
import Twitter from "../assets/link/twitter.svg?react";
import Pinterest from "../assets/link/pinterest.svg?react";

const Links = () => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-9 lg:grid-cols-3 self-center lg:self-start gap-2">
      <a
        href="https://mail.google.com/"
        target="_blank"
        className="w-12 h-12 bg-neutral-900 hover:bg-neutral-950 shadow-md rounded-md transition-all"
      >
        <Gmail className="m-auto w-12 h-12 p-3.5 fill-white" />
      </a>
      <a
        href="https://www.youtube.com/"
        target="_blank"
        className="w-12 h-12 bg-neutral-900 hover:bg-neutral-950 shadow-md rounded-md transition-all"
      >
        <Youtube className="m-auto w-12 h-12 p-3 fill-white" />
      </a>
      <a
        href="https://www.linkedin.com/"
        target="_blank"
        className="w-12 h-12 bg-neutral-900 hover:bg-neutral-950 shadow-md rounded-md transition-all"
      >
        <Linkedin className="m-auto w-12 h-12 p-3 fill-white" />
      </a>
      <a
        href="https://www.github.com/"
        target="_blank"
        className="w-12 h-12 bg-neutral-900 hover:bg-neutral-950 shadow-md rounded-md transition-all"
      >
        <Github className="m-auto w-12 h-12 p-3 fill-white" />
      </a>
      <a
        href="https://www.reddit.com/"
        target="_blank"
        className="w-12 h-12 bg-neutral-900 hover:bg-neutral-950 shadow-md rounded-md transition-all"
      >
        <Reddit className="m-auto w-12 h-12 p-3 fill-white" />
      </a>
      <a
        href="https://www.pinterest.com/"
        target="_blank"
        className="w-12 h-12 bg-neutral-900 hover:bg-neutral-950 shadow-md rounded-md transition-all"
      >
        <Pinterest className="m-auto w-12 h-12 p-3 fill-white" />
      </a>
      <a
        href="https://www.facebook.com/"
        target="_blank"
        className="w-12 h-12 bg-neutral-900 hover:bg-neutral-950 shadow-md rounded-md transition-all"
      >
        <Facebook className="m-auto w-12 h-12 p-3 fill-white" />
      </a>
      <a
        href="https://www.instagram.com/"
        target="_blank"
        className="w-12 h-12 bg-neutral-900 hover:bg-neutral-950 shadow-md rounded-md transition-all"
      >
        <Instagram className="m-auto w-12 h-12 p-3 fill-white" />
      </a>
      <a
        href="https://www.twitter.com/"
        target="_blank"
        className="w-12 h-12 bg-neutral-900 hover:bg-neutral-950 shadow-md rounded-md transition-all"
      >
        <Twitter className="m-auto w-12 h-12 p-3 fill-white" />
      </a>
    </div>
  );
};

export default Links;
