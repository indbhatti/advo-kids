import Image from "next/image";

export default function About() {
  return (
    <div
      className="flex flex-col lg:flex-row container mx-auto justify-center items-center px-14 sm:pt-56"
      id="about"
    >
      <div className="basis-1/2 my-5">
        <div>
          <Image
            src="/why1.png"
            width="600"
            height="700"
            alt=""
            className="img-fluid"
          />
        </div>
      </div>
      <div className="basis-1/2">
        <h1 className="text-5xl font-extrabold py-8">About our Education</h1>
        <p className="text-xl  font-semibold text-justify">
          Education is the cornerstone of our mission. We are firm believers in
          the transformative power of knowledge, and we strive to educate
          children about their rights, enabling them to safeguard themselves and
          stand up for others. Our goal is to arm children with the necessary
          knowledge to confidently and safely navigate their world.
        </p>
      </div>
    </div>
  );
}
