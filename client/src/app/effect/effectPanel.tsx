import * as React from 'react';
import {Effect, EffectProps} from './effect';
import {OscClient} from "../osc/oscClient";

export interface EffectPanelProps {
    oscClient : OscClient;
};

export interface EffectPanelState {
    oscClient : OscClient
};

export class EffectPanel extends React.Component < EffectPanelProps,
EffectPanelState > {

    effects : EffectProps[] = [
        {
            id: 'random-circle',
            name: 'Random Circle',
            onChangeEffect: () => this.changeEffect(0)
        }, {
            id: 'snowstorm',
            name: 'Snowstorm',
            onChangeEffect: () => this.changeEffect(2)
        }
    ];

    constructor(props : any) {
        super(props);
        this.state = {
            oscClient: this.props.oscClient
        };
    }

    public render() : any {return(
            <ul className="effect-panel">
                {this.getEffectList()}
            </ul>
        );}

    public getEffectList() {
        return (this.effects.map((effect) => {
            return <Effect
                key={effect.id}
                id={effect.id}
                name={effect.name}
                onChangeEffect={effect
                .onChangeEffect
                .bind(this)}/>;
        }));
    }

    public changeEffect(effectId : number) {
        this
            .state
            .oscClient
            .send("/effect", [
                {
                    type: 'i',
                    value: effectId
                }
            ]);
    }
}

export default EffectPanel;
