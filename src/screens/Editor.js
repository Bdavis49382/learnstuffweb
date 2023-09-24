import Word from '../components/Word';
import { ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {useState} from 'react';
import {storage} from '../firebase';

export default function Editor({vocabSet,setVocabSet,setScreen,saveVocabSet}) {
    const [,update] = useState();
    const setWord = (newWord,index) => {
        setVocabSet(oldSet => {
            oldSet.words[index] = newWord;
            return oldSet;
        })
        update({});
    }
    const uploadFile = async (file) => {
        console.log(storage);
        console.log(file.name);
        console.log(ref(storage));
        const storageRef = ref(storage,file.name)
        await uploadBytes(storageRef, file);
        console.log('uploaded successfully');
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    }
    const removeWord = (index) => {
        setVocabSet(oldSet => {
            oldSet.words.splice(index,1);
            return oldSet;
        })
        update({});
    }
    return (
        <div>
            <h1>{vocabSet.name}</h1>
            {vocabSet.words.map((word,index) => 
                <Word word={word} uploadFile={uploadFile} index={index} setVocabSet={setVocabSet} setWord={setWord} removeWord={removeWord}></Word>
            )}
            <button onClick={() => {
                setVocabSet({...vocabSet,words:[...vocabSet.words,{term:'',definition:'',editing:true}]})
            }}>+</button>
            <div></div>
            <button onClick={() => {
                saveVocabSet();
                setScreen('menu');
            }}>Back</button>
        </div>
    )
}