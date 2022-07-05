import { useEffect, useContext, useState } from "react";
import { UserContext } from "../contexts";

export default function Settings() {
  const [text, setText] = useState();
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    fetch("/api/settings")
      .then((resp) => resp.json())
      .then((data) => setText(data.message));
  }, []);

  return (
    <h1>
      Settings {user} {text}
    </h1>
  );
}
