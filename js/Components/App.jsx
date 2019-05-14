import React from 'react';
import {StickyNote} from "./StickyNote.jsx";

const NOTES_URL = "http://localhost:3000/notes";
const METHOD_POST = "POST";
const METHOD_PATCH = "PATCH";
const METHOD_DELETE = "DELETE";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
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
                })
            })
            .catch(err => console.warn(err))
    }

    addNoteOnClick = () => {
        const newNote = {
            content: '',
            x: Math.floor(Math.random() * 400),
            y: Math.floor(Math.random() * 400)
        };
        this.updateStickers(newNote, METHOD_POST)
    };

    deleteNoteOnClick = (noteToDel) => {
        const uri = NOTES_URL + `/${noteToDel.id}`;
        fetch(uri, {
            method : METHOD_DELETE,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteToDel)
            })
            .then(res => res.json())
            .then(() => {
                let stickers = this.state.notes;
                const index = stickers.findIndex(note => note.id === noteToDel.id);
                stickers.splice(index, 1);
                this.setState({
                    notes: stickers
                });
            })
            .catch(err => console.warn(err));
    };

    updateStickers = (note, method) => {
        const uri = NOTES_URL + ((method === METHOD_PATCH) ? `/${note.id}` : "");
        fetch(uri, {
            method : method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
            })
            .then(res => res.json())
            .then( data => {
                let stickers = [];
                const index = this.state.notes.findIndex(note => note.id === data.id);
                if (index === -1 && method === METHOD_POST) {
                    stickers = this.state.notes.concat(data);
                    this.setState({
                        notes: stickers
                    });
                }
            })
            .catch(err => console.warn(err));
    };

    handleOnChange = (data) => {
        let note = this.state.notes.find(item => item.id === data.id);
        Object.assign(note,data);
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
                onDelete={this.deleteNoteOnClick}
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