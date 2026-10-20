interface ImportMetaEnv {
  /** Número comercial de WhatsApp, solo dígitos con indicativo de país. */
  readonly PUBLIC_WHATSAPP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
