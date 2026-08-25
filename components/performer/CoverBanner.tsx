import Image from "next/image";

type Props = {
  name: string;
  coverUrl: string;
};

export default function CoverBanner({ name, coverUrl }: Props) {
  return (
    <div className="relative h-[30vh] w-full overflow-hidden bg-espresso landscape:h-[50vh]">
      <Image
        src={coverUrl}
        alt={`${name} cover`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-espresso/40 via-transparent to-transparent" />
    </div>
  );
}
