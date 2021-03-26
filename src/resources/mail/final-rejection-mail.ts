import Mail from './mail';

export default class FinalRejectionMail extends Mail {
    constructor() {
        super();
        this.subject = 'UBC LaunchPad Application Final Decision';
        this.text =
            "Thank you for your interest in joining us and taking time to complete the application! \n We're sorry to inform you that the positions of this term have been filled.";
        this.html =
            "<h5>Thank you for your interest in joining us and taking time to complete the application! \n We're sorry to inform you that the positions of this term have been filled.</h5>";
    }
}
