export default function Menu(props) {
    return (
        <div>
            <h1>Vocab Sets for {props.user}</h1>
            {props.vocabSets.filter(vocabSet => vocabSet.user === props.user).map(vocabSet => 
                <button onClick={() => {
                    props.setVocabSet(vocabSet);
                    props.setScreen('editor');
                }}>{vocabSet.name}</button>
            )}
            <button onClick={() => props.setScreen("welcome")}>Back</button>
        </div>
    )
}