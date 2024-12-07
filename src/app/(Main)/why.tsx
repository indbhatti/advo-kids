import Image from "next/image";

export default function Why() {
  return (
    <div
      className="container mx-auto flex flex-col-reverse lg:flex-row justify-center items-center px-14 pt-16"
      id="why"
    >
      <div className="basis-1/2">
        <h1 className="text-5xl font-extrabold py-8">Why Us?</h1>
        <p className="text-xl font-semibold text-justify">
          Choosing us means choosing a dedicated team that is deeply committed
          to the cause of child awareness and rights. We are unique in our
          approach, as we strive to make complex laws and rights understandable
          for children.We use innovative and engaging methods to deliver our
          content, ensuring it resonates with our young audience. With us,
          you&apos;re not just choosing a website, you&apos;re choosing a
          partner in creating a safer world for children.
        </p>
      </div>
      <div className="basis-1/2">
        <Image
          src="/admission1.png"
          width="600"
          height="600"
          alt="admission"
          className="px-4 mx-auto"
        />
      </div>
    </div>
  );
}
