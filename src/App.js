import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Editor from './screens/Editor';
import {useEffect,useState} from 'react';
import {query, collection, onSnapshot,setDoc,doc} from 'firebase/firestore';
import {db} from './firebase';
import './App.css';

function App() {
  const [firstTime,setFirstTime] = useState(false);
  const [screen,setScreen] = useState("welcome");
  const [user,setUser] = useState("");
  const [vocabSet, setVocabSet] = useState({});
  const [vocabSets,setVocabSets] = useState([]);
  useEffect(() => {
      try {
          const q = query(collection(db,'vocabSets'));
          onSnapshot(q, querySnapshot => {
              const vocabSets = [];
              querySnapshot.forEach(doc => {
                  vocabSets.push({...doc.data(),id:doc.id})
              });
              setVocabSets(vocabSets);
          });
      }
      catch (err) {
          alert(err);
      }
  },[])
  const saveVocabSet = () => {
      const id = vocabSets.filter(set => set.name.toUpperCase() === vocabSet.name.toUpperCase())[0].id;
      setDoc(doc(db,'vocabSets',id),vocabSet);
  }
  switch (screen) {
    case "welcome":
      return <Welcome setFirstTime={setFirstTime} setScreen={setScreen}></Welcome>
    case "login":
      return <Login firstTime={firstTime} setScreen={setScreen} setUser={setUser}></Login>
    case "menu":
      return <Menu setScreen={setScreen} user={user} setVocabSet={setVocabSet} vocabSets={vocabSets}></Menu>
    case "editor":
      return <Editor setScreen={setScreen} vocabSet={vocabSet} setVocabSet={setVocabSet} saveVocabSet={saveVocabSet}></Editor>
    default:
      return <h1>Error</h1>
  }
}

export default App;
