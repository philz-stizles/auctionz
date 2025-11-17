export interface AuthResponse {
  principalId: string;
  policyDocument: PolicyDocument;
}

export interface PolicyDocument {
  Version?: string;
  Statement?: Statement[];
}

export interface Statement {
  Action?: string;
  Effect?: string;
  Resource?: string;
}