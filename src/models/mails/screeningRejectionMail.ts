import Mail from './mail';

export default class ScreeningRejectionMail extends Mail {
    constructor() {
        super();
        this.subject = 'UBC LaunchPad Application Decision';
        this.text = 'Thank you for your interest in joining us and taking time to complete the application! \n We\'re sorry to inform you that we are not able to move forward with you this time.';
        this.html = '<h5>Thank you for your interest in joining us and taking time to complete the application! /n We\'re sorry to inform you that we are not able to move forward with you this time.</h5>'
    }
}
