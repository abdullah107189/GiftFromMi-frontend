import { toast } from "sonner";
import "./App.css";
import { Button } from "./components/ui/button";
import Users from "./components/users/Users";
function App() {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Users></Users>
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast
        </Button>
      </div>
    </>
  );
}

export default App;
