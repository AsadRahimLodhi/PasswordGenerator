import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [Charactor, setCharactor] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (Charactor) str += "`~!@#$%^&*_-+=[]";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, setCharactor, setNumber, setPassword]);

  const handleRangeChange = (e) => {
    setLength(e.target.value);
  };
  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    PasswordGenerator();
  }, [setCharactor, length, setNumber, PasswordGenerator]);

  return (
    <>
      <div className="">
        <div className="bg-slate-600  flex justify-center m-4 pb-4  h-auto ">
          <div className="text-white mt-4">
            <h1 className="flex justify-center">Password Generator</h1>
            <div className="flex align-baseline">
              <input
                className="m-2 w-full text-orange-400"
                type="text"
                value={Password}
                readOnly
                placeholder="Password"
                ref={passwordRef}
              />
              <button
                className="bg-blue-600 p-2 rounded-lg"
                onClick={copyToClipBoard}
              >
                Copy
              </button>
            </div>
            <div>
              <input
                type="range"
                min={8}
                max={20}
                value={length}
                onChange={handleRangeChange}
              />
              <label className="p-2">: Range {length}</label>
              <label className="p-2" htmlFor="numberInput">
                : Number
              </label>
              <input
                type="checkbox"
                defaultChecked={number}
                id="numberInput"
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
              />
              <label className="p-2" htmlFor="charactorInput">
                : Charactor
              </label>
              <input
                type="checkbox"
                defaultChecked={Charactor}
                id="charactorInput"
                onChange={() => {
                  setCharactor((prev) => !prev);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
