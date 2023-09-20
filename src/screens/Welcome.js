export default function Welcome(props) {
    return (
        <div>
            <h1>Welcome!</h1>
            <button onClick={() => {props.setFirstTime(false);props.setScreen("login");}}>Login</button>
            <button onClick={() => {props.setFirstTime(true);props.setScreen("login");}}>Sign up</button>
        </div>
    )
}