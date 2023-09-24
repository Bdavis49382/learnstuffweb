export default function Word({word,index,setWord,removeWord,uploadFile}) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const elements = event.target.elements;
        const newWord = {}
        // if (elements.picture) {
        //     newWord.term = elements.term.value;
        //     newWord.definition = elements.definition.value;
        //     newWord.editing = false;
        // }
        if (elements.term.value.length > 0) {
            newWord.term = elements.term.value; 
            newWord.editing = false;
            if (word.picture) {
                if (elements.picture.files.length === 1) {
                    newWord.definition = await uploadFile(elements.picture.files[0]);
                }
                else {
                    console.log('empty file');
                    newWord.definition = '';
                }
            }
            else {
                if (elements.definition.value) {
                    newWord.definition = elements.definition.value;
                }
                else {
                    console.log('empty definition');
                    newWord.definition = '';
                }
            }
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
                    {word.picture?
                    <input name="picture" type="file"></input>
                    :
                    <input name="definition" defaultValue={word.definition} placeholder="definition"></input>
                    
                }
                    <input type="submit"/>
                </form>
                <span onClick={() => {
                    setWord({...word,picture:word.picture===true?false:true},index)
                }}>
                    🖼️
                </span>
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