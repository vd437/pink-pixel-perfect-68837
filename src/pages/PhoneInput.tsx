import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

const countries = [
  { name: "Afghanistan", code: "+93" },
  { name: "Albania", code: "+355" },
  { name: "Algeria", code: "+213" },
  { name: "American Samoa", code: "+1684" },
  { name: "Andorra", code: "+376" },
  { name: "Angola", code: "+244" },
  { name: "Anguilla", code: "+1264" },
  { name: "Antigua and Barbuda", code: "+1268" },
  { name: "Argentina", code: "+54" },
  { name: "Armenia", code: "+374" },
  { name: "Aruba", code: "+297" },
  { name: "Ascension Island", code: "+247" },
];

const PhoneInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");
  const [selectedCountry, setSelectedCountry] = useState({ name: "US", code: "+1" });

  useEffect(() => {
    if (location.state?.selectedCountry) {
      setSelectedCountry(location.state.selectedCountry);
    }
  }, [location.state]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <Link to="/login" className="flex h-10 w-10 items-center justify-center">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-semibold">Log in</h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
          <HelpCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("phone")}
          className={`flex-1 border-b-2 py-3 text-sm font-medium transition-colors ${
            activeTab === "phone"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground"
          }`}
        >
          Phone
        </button>
        <button
          onClick={() => setActiveTab("email")}
          className={`flex-1 border-b-2 py-3 text-sm font-medium transition-colors ${
            activeTab === "email"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground"
          }`}
        >
          Email / Username
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6">
        {activeTab === "phone" ? (
          <div className="flex rounded-lg bg-muted overflow-hidden">
            <button 
              onClick={() => navigate('/country-selector', { state: { selectedCountry } })}
              className="flex items-center gap-1 px-4 py-3 text-sm font-medium border-r border-border/30"
            >
              {selectedCountry.name} {selectedCountry.code}
              <ChevronDown className="h-4 w-4" />
            </button>

            <Input
              type="tel"
              placeholder="Phone number"
              className="flex-1 h-12 border-0 bg-transparent text-base placeholder:text-muted-foreground focus-visible:ring-0"
            />
          </div>
        ) : (
          <Input
            type="text"
            placeholder="Email or Username"
            className="h-12 rounded-lg bg-muted border-0 text-base placeholder:text-muted-foreground focus-visible:ring-0"
          />
        )}
      </div>

      {/* Footer Button */}
      <div className="p-6">
        <Link to="/verify" className="block">
          <Button variant="tiktok" size="xl" className="w-full">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PhoneInput;
