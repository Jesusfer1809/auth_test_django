/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import axios from "axios";
import { useQuery } from "react-query";

function Index() {
  const user = useAuthStore((state) => state.user);
  const authTokens = useAuthStore((state) => state.authTokens);

  const logOutUser = useAuthStore((state) => state.logOutUser);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOutUser();

    navigate("/login");
  };

  const getNotes = async()=>{
    try{
      const res = await axios.get("http://localhost:8000/api/v1/notes/",{
        headers:{
          "Authorization" : `Bearer ${authTokens?.access}`
        }
      })
      return res.data

    }catch(err){
      console.log(err)
    }
  }

  const {isLoading: notesAreLoading, data:notes} = useQuery(`${user?.username}-notes`, getNotes)

  if (notesAreLoading) return <h1>Loading...</h1>

  return (
    <div className="flex flex-col gap-y-12 p-4">
      <h1>Welcome to the home page, {user?.username}!</h1>

      <button
        onClick={handleLogOut}
        className="px-4 py-2 font-medium bg-[#333] text-white w-max rounded-lg"
      >
        Logout
      </button>

      <div>
        <h2>Notes:</h2>

        <ul>
          {
            //@ts-ignore
            notes.map(note=>(
              <li key={note.id}>{note.body}</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Index;
