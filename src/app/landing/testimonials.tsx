/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const testimonials = [
  {
    quote:
      "Setting up my online boutique was incredibly easy. I was able to launch within a week and sales started coming in immediately.",
    author: "Sarah Johnson",
    role: "Fashion Boutique Owner",
    avatar: "/38130439.jpeg",
    rating: 5,
  },
  {
    quote:
      "The analytics tools helped me understand what products were performing best, allowing me to optimize my inventory and increase profits.",
    author: "Michael Chen",
    role: "Electronics Store Owner",
    avatar: "/99688077.jpeg",
    rating: 5,
  },
  {
    quote:
      "Customer support has been exceptional. Whenever I had questions, the team was there to help me every step of the way.",
    author: "Emma Rodriguez",
    role: "Handmade Crafts Seller",
    avatar: "/young-black-woman-with-afro-hairstyle-smiling-urban-city-mixed-girl-colorful-sweater_1157-42590.jpg",
    rating: 4,
  },
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);
const thirdRow = testimonials.slice(0, testimonials.length / 2);
const fourthRow = testimonials.slice(testimonials.length / 2);

const ReviewCard = ({
  avatar,
  author,
  role,
  quote,
}: {
  avatar: string;
  author: string;
  role: string;
  quote: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit max-w-md cursor-pointer overflow-hidden rounded-2xl border p-6",
        "border-gray-950/[.1] bg-white shadow-lg dark:border-gray-50/[.1] dark:bg-white/[.05] dark:hover:bg-white/[.1]",
        "transition-transform hover:scale-[1.02]"
      )}
    >
      <div className="flex flex-row items-center gap-4 mb-4">
        <img className="rounded-full" width="48" height="48" alt={author} src={avatar} />
        <div className="flex flex-col">
          <figcaption className="text-lg font-semibold dark:text-white">{author}</figcaption>
          <p className="text-sm text-gray-600 dark:text-white/50">{role}</p>
        </div>
      </div>
      <blockquote className="text-base leading-relaxed text-gray-800 dark:text-white">
        “{quote}”
      </blockquote>
    </figure>
  );
};

export function Testimonials() {
  return (
    <div className="relative flex h-[36rem] w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-6"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:25s]">
          {firstRow.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
          {secondRow.map((review, i) => (
            <ReviewCard key={i + 10} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
          {thirdRow.map((review, i) => (
            <ReviewCard key={i + 20} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover vertical className="[--duration:25s]">
          {fourthRow.map((review, i) => (
            <ReviewCard key={i + 30} {...review} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
    </div>
  );
}
