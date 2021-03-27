import Mail from './mail';

export default class ScreeningAcceptanceMail extends Mail {
    constructor() {
        super();
        this.subject = 'UBC LaunchPad Interview Invitation';
        this.text = "Congratulations! You're invited for an interview with us.";
        this.html = "<h5>Congratulations! You're invited for an interview with us.</h5>";
    }
}
