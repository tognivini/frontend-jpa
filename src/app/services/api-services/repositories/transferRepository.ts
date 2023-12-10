import { api } from "../../axios/index"
import { routes } from "../types/endpoints"


interface ITransferBody {
  chaveUsuarioDestino: string,
  nomeUsuarioDestino: string,
  noncePila: string
}

async function onSendPilaTransferation(body: ITransferBody) {
  return new Promise((resolve, reject) => {
    api
      .post(routes.TRANSFER_PILA, body)
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
  });
}

export {
  onSendPilaTransferation
};
