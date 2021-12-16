import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"

const Home = props => {

  return (
    <div>
      <h2>Home</h2>
      {!props.authenticated ? <LoginForm onAuthenticated={props.onAuthenticated} /> : ""}
      <br/>
      {!props.authenticated ? <RegisterForm onAuthenticated={props.onAuthenticated} /> : ""}

    </div>
  )
}

export default Home