import "./App.css";
import { CelebritiesList } from "./components/CelebritiesList";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { CelebrityActions } from "./store/celebrity.slice";

function App() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.celebrity.searchText);
  const handleInputChange = (event) => {
    dispatch(CelebrityActions.updateSearchText(event.target.value));
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Celebrites Info</h1>
      </header>
      <main>
        <TextField
          id="outlined-basic"
          label="Search User"
          variant="outlined"
          sx={{ margin: "16px", width: "30%" }}
          value={searchText}
          onChange={handleInputChange}
        />
        <CelebritiesList />
      </main>
    </div>
  );
}

export default App;
