export default function Word({word,index,setWord,removeWord}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const elements = event.target.elements;
        const newWord = {}
        if (elements.term.value.length > 0 && elements.definition.value.length > 0) {
            newWord.term = elements.term.value; 
            newWord.definition = elements.definition.value;
            newWord.editing = false;
            setWord(newWord,index);
            event.target.reset();
        }
        else {
            console.log("empty box");
        }
    }
    if (word.editing) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input name="term" defaultValue={word.term} placeholder="term"></input>
                    <input name="definition" defaultValue={word.definition} placeholder="definition"></input>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
    else {
        return (
            <div>
            {word.definition.slice(0,5) === 'https'?
            <span>
                <span>{word.term}</span>
                <img src={word.definition} alt={word.term}></img>
            </span>:
            <span>{word.term} {word.definition}</span>
            }
                <span onClick={() => {
                    setWord({...word,editing:true},index);
                }}>✏️</span>
                <span onClick={() => {
                    removeWord(index);
                }}>🗑️</span>
            </div>
        )
    }
}