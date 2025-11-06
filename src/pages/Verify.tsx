import { useState, useRef, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";

const Verify = () => {
  const [codes, setCodes] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(53);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <Link to="/phone-input" className="flex h-10 w-10 items-center justify-center">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-semibold">Verify</h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
          <HelpCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6">
        <h2 className="mb-2 text-2xl font-bold">Verify email</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Use the link or enter the code sent to tameryiusefyousef@gmail.com
        </p>

        {/* Code Inputs */}
        <div className="mb-6 flex justify-center gap-2 sm:gap-3">
          {codes.map((code, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg bg-muted text-center text-xl font-medium focus:border-2 focus:border-primary focus:outline-none focus:ring-0"
            />
          ))}
        </div>

        {/* Resend Code */}
        <div className="mb-6 flex items-center justify-center gap-2 text-sm">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            Resend code
          </button>
          <span className="text-muted-foreground">{timer}s</span>
        </div>

        {/* Help Link */}
        <div className="flex justify-center">
          <button className="text-sm font-semibold hover:underline">
            Need help logging in?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
