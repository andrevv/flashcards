import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Settings() {
  const [text, setText] = useState();
  const auth = useAuth();

  useEffect(() => {
    fetch("/api/settings")
      .then((resp) => resp.json())
      .then((data) => setText(data.message));
  }, []);

  return (
    <h1>
      Settings {text} for {auth.user}.
    </h1>
  );
}
