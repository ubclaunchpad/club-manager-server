export interface IMail {
    from: string;
    subject: string;
    text: string;
    html: string;
}

export default class Mail {
    private from: string;
    protected subject: string;
    protected text: string;
    protected html: string;

    constructor() {
        this.from = 'ubc.launchpad.clubmanager@gmail.com';
        this.subject = '';
        this.text = '';
        this.html = '';
    }
}
