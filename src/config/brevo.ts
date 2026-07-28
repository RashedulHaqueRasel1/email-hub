import * as brevo from "@getbrevo/brevo";

import { env } from "./env";

const transactionalEmailsApi = new brevo.TransactionalEmailsApi();

transactionalEmailsApi.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, env.BREVO_API_KEY);

export { brevo, transactionalEmailsApi };
