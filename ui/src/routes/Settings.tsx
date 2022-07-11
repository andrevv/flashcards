import { useEffect, useState } from "react";

export default function Settings() {
  const [text, setText] = useState();

  useEffect(() => {
    fetch("/api/settings")
      .then((resp) => resp.json())
      .then((data) => setText(data.message));
  }, []);

  return (
    <h1>
      Settings {text}
    </h1>
  );
}
