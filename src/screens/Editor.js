import Word from '../components/Word';
import {useState} from 'react';
export default function Editor({vocabSet,setVocabSet,setScreen,saveVocabSet}) {
    const [,update] = useState();
    const setWord = (newWord,index) => {
        setVocabSet(oldSet => {
            oldSet.words[index] = newWord;
            return oldSet;
        })
        update({});
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
                <Word word={word} index={index} setVocabSet={setVocabSet} setWord={setWord} removeWord={removeWord}></Word>
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