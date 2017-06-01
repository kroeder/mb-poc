export interface BasicEffect {
    api: OscApiMethod;
    update(numberOfTicks: number): void;
    getDrawable(): any;
}

export interface OscApiMethod {
    [name: string]: Function
}