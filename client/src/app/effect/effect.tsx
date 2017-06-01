import * as React from 'react';

export interface EffectProps {
    id : string,
    name : string,
    onChangeEffect : Function
};

export interface EffectState {};

export class Effect extends React.Component < EffectProps,
EffectState > {
    public render() : JSX.Element {return(
            <li
                className="effect-button"
                onClick={this
                .props
                .onChangeEffect
                .bind(this)}>{this.props.name}</li>
        );}
}

export default Effect;
