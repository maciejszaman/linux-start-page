import { useEffect, useRef, useState } from "react";
import "./App.css";
import * as Types from "../types/link.types";

function App() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [textAreaContent, setTextAreaContent] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Load the links from localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("linuxstartpageLinks");
      console.log(savedData);
      if (savedData) {
        setTextAreaContent(savedData);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSave = (text: string) => {
    try {
      setTextAreaContent(text);
      localStorage.setItem("linuxstartpageLinks", text);
      console.log("Adding" + textAreaContent + "to localStorage");
      console.log(
        "current local storage" + localStorage.getItem("linuxstartpageLinks")
      );
    } catch (err) {
      console.log(err);
    }
  };

  const formatLinksContent = (text: string) => {
    const lines = text.split("\n").filter((line) => line.trim());
    const links: Types.Link[] = [];

    lines.forEach((line, index) => {
      const match = line.match(/^([^\/]*)\/?([^\[]+)\[([^\]]+)\]$/);
      if (match) {
        const decorator = match[1];
        const displayName = match[2].trim();
        let url = match[3].trim();

        links.push({ id: index, decorator, displayName, url });
      }
    });
    return links;
  };

  const links = formatLinksContent(textAreaContent);

  return (
    <>
      <div className="text flex gap-16 justify-center items-center h-screen">
        <div className="left flex flex-col gap-2">
          <h1 className="text-[#fad07b] text-4xl font-bold">Welcome</h1>

          <div className="leftbox border-2 w-[300px] h-[300px] border-[#fad07b] rounded-lg">
            <img
              className="rounded-lg border-2 border-[#fad07b]"
              src="https://picsum.photos/300"
            />
          </div>
        </div>
        <div className="right text-2xl">
          {editMode ? (
            <div className="flex gap-6 mb-2">
              <h2
                onClick={() => handleSave(textAreaRef.current.value)}
                className="cursor-pointer text-[#7ebab2] text-4xl font-bold"
              >
                Save
              </h2>
              <h2
                onClick={() => setEditMode(false)}
                className="cursor-pointer text-[#e57d7f] text-4xl font-bold"
              >
                Exit
              </h2>
            </div>
          ) : (
            <h2
              onClick={() => setEditMode(true)}
              className="text-[#ed8274] cursor-pointer text-4xl font-bold"
            >
              Links
            </h2>
          )}
          {editMode ? (
            <textarea
              defaultValue={textAreaContent}
              ref={textAreaRef}
              className="ring-2 rounded-lg w-[500px] h-[320px] text-sm focus:outline-none"
            ></textarea>
          ) : (
            <div>
              {links.map((link) => (
                <div key={link.id} className="flex items-center">
                  <span className="mr-1">{link.decorator}</span>
                  <a key={link.id} href={link.url}>
                    <p>{link.displayName}</p>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
