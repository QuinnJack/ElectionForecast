import "./App.css";
import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./components/ui/Button.tsx";

function App() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button
        startIcon={<Star />}
        endIcon={<Star />}
        variant="primary"
        size="xs"
      >
        Button
      </Button>
      <Button
        startIcon={<Star />}
        endIcon={<Star />}
        variant="primary"
        size="sm"
      >
        Button
      </Button>
      <Button
        startIcon={<Star />}
        endIcon={<Star />}
        variant="primary"
        size="md"
      >
        Button
      </Button>
      <Button
        startIcon={<Star />}
        endIcon={<Star />}
        variant="primary"
        size="lg"
      >
        Button
      </Button>
    </div>
  );
}

export default App;
