import Typewriter from "typewriter-effect";

export default function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Research Assistant",
          "Essay Writer",
          "Chat Assistant",
          "Consultant",
          "Scientist",
          "Historian",
          "Friend?"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}