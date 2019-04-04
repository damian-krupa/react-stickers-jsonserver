import React from 'react';
import {StickyNote} from "./StickyNote.jsx";

const NOTES_URL = "http://localhost:3000/notes";
const METHOD_POST = "POST";
const METHOD_PATCH = "PATCH";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            counter: 0
        }
    }

    componentDidMount() {
        fetch(NOTES_URL)
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Something went wrong")
                }
            })
            .then(resp => {
                this.setState({
                    notes: resp,
                    counter: resp.length
                })
            })
            .catch(err => console.warn(err))
    }

    addNoteOnClick = () => {
        const newNote = {
            id: this.state.counter + 1,
            content: 'qwer',
            x: Math.floor(Math.random() * 400),
            y: Math.floor(Math.random() * 400)
        };
        this.updateStickers(newNote, METHOD_POST)
    };

    updateStickers = (newNote, method) => {
        const uri = NOTES_URL + (method === METHOD_PATCH ? `/${newNote.id}` : "");
        fetch(uri, {
            method : method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
            })
            .then(res => res.json())
            .then( data => {
                let stickers = [];
                const index = this.state.notes.findIndex(note => note.id === data.id);
                if (index > -1) {
                    //there is no need to do stuff when it already exists
                } else {
                    stickers = this.state.notes.concat(data);
                    this.setState({
                        notes: stickers,
                        counter: this.state.counter + 1
                    });
                }
            })
            .catch(err => console.warn(err));
    };

    handleOnChange = (data) => {
        let note = this.state.notes.find(item => item.id === data.id);
        note = Object.assign(note,data);
        console.log(note);
        this.setState({
            notes: Object.assign(this.state.notes, note)
        });

        this.updateStickers({
            id: note.id,
            content: note.content,
            x: note.x,
            y: note.y
        },METHOD_PATCH)
    };

    render() {
        const notes = this.state.notes.map(note => {
            return <StickyNote
                key={note.id.toString()}
                id={note.id}
                content={note.content}
                x={note.x}
                y={note.y}
                onChange={this.handleOnChange}
            />
        });

        return (
            <div>
                <button
                    className="addNoteBtn"
                    onClick={this.addNoteOnClick}
                >
                    Add a new sticker
                </button>
                {notes}
            </div>
        )
    }
}