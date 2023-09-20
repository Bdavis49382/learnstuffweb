import {getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth';
export default function Login(props) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        const elements = event.target.elements;
        console.log(elements.length);
        try {
            const userInfo = props.firstTime 
            ? await createUserWithEmailAndPassword(auth, elements.username.value,elements.password.value) 
            : await signInWithEmailAndPassword(auth, elements.username.value, elements.password.value);
            props.setUser(userInfo.user.email);
            props.setScreen("menu");
            event.target.reset();
            console.log(userInfo.user.email);
        }
        catch (err) {
            alert(err);
            console.log(err);
        }
    }
    return (
        <div>
            <h1>{props.firstTime?"Create Account":"Login Here"}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" name="username"></input>
                <input type="password" placeholder="password" name="password"></input>
                <input type="submit"></input>
            </form>
            <button onClick={() => props.setScreen("welcome")}>Back</button>
        </div>
    )
}