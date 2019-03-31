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
                position={{
                    x:this.props.x,
                    y:this.props.y
                }}
                onStop={this.onControlledDragStop}
            >
                <div className="sticker">
                    <div className='bar'/>
                    <textarea
                        value={this.props.content}
                        onChange={this.onContentChange}
                    />
                </div>
            </Draggable>
        )
    }
}