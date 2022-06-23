// eslint-disable-next-line no-unused-vars
declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    SENDGRID_API_KEY: string;
    SEND_TO_EMAIL: string;
    TEMPLATE_ID: string;
    SPREADSHEET_ID: string;
    GOOGLE_APPLICATION_CREDENTIALS: string;
  }
}
