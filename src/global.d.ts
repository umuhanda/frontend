declare const IremboPay: {
  initiate: (config: {
    publicKey: string;
    invoiceNumber: string;
    locale: 'EN' | 'FR' | 'RW';
    callback: (err: any, resp: any) => void;
  }) => void;
};
