import Mail from './mail';

export default class FinalAcceptanceMail extends Mail {
    constructor() {
        super();
        this.subject = 'UBC LaunchPad Application Final Decision';
        this.text = "Congratulations! We're pleased to offer you a position at UBC LaunchPad this September.";
        this.html = "<h5>Congratulations! We're pleased to offer you a position at UBC LaunchPad this September.</h5>";
    }
}
