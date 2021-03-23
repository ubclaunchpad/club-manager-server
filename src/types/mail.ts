export interface Mail {
    /* to: string; omit this field, and programatically add it in when using the API */
    from: string;
    subject: string;
    text: string;
    html: string;
}
