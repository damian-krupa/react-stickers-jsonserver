import React from 'react';
import Draggable from 'react-draggable';


export class StickyNote extends React.Component {
    constructor(props) {
        super(props);
    }

    onContentChange = (ev) => {
        this.props.onChange({
            id: this.props.id,
            content: ev.target.value
        });
    };

    onDeleteBtnClick = () => {
        this.props.onDelete({
            id: this.props.id
        });
    };

    onControlledDragStop = (e, position) => {
        const {x, y} = position;
        this.props.onChange({
            id: this.props.id,
            x:x,
            y:y
        });
    };

    render() {
        return (
            <Draggable
                handle=".bar"
                cancel='.deleteButton'
                position={{
                    x:this.props.x,
                    y:this.props.y
                }}
                onStop={this.onControlledDragStop}
            >
                <div className="sticker">
                    <div className='bar'>
                        <button className='deleteButton' onClick={this.onDeleteBtnClick}/>
                    </div>
                    <textarea value={this.props.content} onChange={this.onContentChange}/>
                </div>
            </Draggable>
        )
    }
}