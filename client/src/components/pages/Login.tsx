import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/AuthStore"
import {useEffect, useState, } from "react"


function Login() {
  const logInUser = useAuthStore((state)=> state.logInUser)
  const navigate = useNavigate()

  const [userBody, setUserBody] = useState({
    username: "",
    password:""
  })

 
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setUserBody({
      ...userBody,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    try{
      console.log(userBody)
      e.preventDefault()
      await logInUser(userBody)

      navigate("/")

    }catch(err){
      console.log("Bad credentials")
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-1/2 h-1/2 border-2 border-teal-900 flex flex-col p-8 rounded-lg items-center justify-center gap-y-8">
        <h1 className="text-xl">Login page</h1>
        <input onChange={handleChange} type="text" name="username" placeholder="Username..." className="w-1/2 px-4 py-2 rounded-md bg-[#f1f1f1] font-medium focus:outline-none border border-teal-300 focus:border-teal-600 transition-all" />
        <input onChange={handleChange} type="password" name="password" placeholder="Password..." className="w-1/2 px-4 py-2 rounded-md bg-[#f1f1f1] font-medium focus:outline-none border border-teal-300 focus:border-teal-600 transition-all" />
        <button type="submit" className="px-8 py-2 w-max bg-teal-800 font-medium rounded-md text-white">Log in</button>
      </form>
    </div>
  )
}

export default Login